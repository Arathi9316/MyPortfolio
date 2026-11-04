import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  ReactFlowProvider,
  useReactFlow
} from '@xyflow/react';
import { EducationNode, SkillNode, ProjectNode } from './CustomNodes';
import { api, fallbackData } from '../services/api';
import { Network, Layers, RefreshCw, Info, CheckCircle2, Move, Smartphone, Monitor } from 'lucide-react';

const nodeTypes = {
  educationNode: EducationNode,
  skillNode: SkillNode,
  projectNode: ProjectNode,
};

// Generates mobile-optimized vertical coordinates
const getMobileNodes = (nodes = []) => {
  const yOffsets = {
    'edu-coer': { x: 20, y: 30 },
    'edu-cdac': { x: 20, y: 140 },
    'skill-java': { x: 20, y: 260 },
    'skill-spring': { x: 20, y: 370 },
    'skill-react': { x: 20, y: 480 },
    'skill-db': { x: 20, y: 590 },
    'skill-devops': { x: 20, y: 700 },
    'proj-ecolift': { x: 20, y: 830 },
    'proj-wanderlust': { x: 20, y: 960 },
  };

  return nodes.map((node, idx) => {
    const customPos = yOffsets[node.id] || { x: 20, y: idx * 110 };
    return {
      ...node,
      position: customPos,
    };
  });
};

// Generates desktop-optimized horizontal 3-column coordinates
const getDesktopNodes = (nodes = []) => {
  const desktopPositions = {
    'edu-coer': { x: 50, y: 120 },
    'edu-cdac': { x: 50, y: 360 },
    'skill-java': { x: 400, y: 60 },
    'skill-spring': { x: 400, y: 180 },
    'skill-react': { x: 400, y: 300 },
    'skill-db': { x: 400, y: 420 },
    'skill-devops': { x: 400, y: 540 },
    'proj-ecolift': { x: 780, y: 160 },
    'proj-wanderlust': { x: 780, y: 380 },
  };

  return nodes.map((node) => ({
    ...node,
    position: desktopPositions[node.id] || node.position,
  }));
};

// Formats edges with appropriate source/target handles depending on orientation
const formatEdges = (rawEdges = [], isMobile = false) => {
  return rawEdges.map((edge) => ({
    ...edge,
    type: 'smoothstep',
    animated: true,
    sourceHandle: isMobile ? 'source-bottom' : 'source-right',
    targetHandle: isMobile ? 'target-top' : 'target-left',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: edge.style?.stroke || '#6366f1',
      width: 16,
      height: 16,
    },
    style: {
      ...edge.style,
      stroke: edge.style?.stroke || '#6366f1',
      strokeWidth: 2.5,
    },
  }));
};

function JourneyCanvas() {
  const { fitView } = useReactFlow();

  // Screen width detection
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  // Initialize with responsive coordinates
  const initialNodes = useMemo(() => {
    return isMobile 
      ? getMobileNodes(fallbackData.journeyGraph.nodes) 
      : getDesktopNodes(fallbackData.journeyGraph.nodes);
  }, [isMobile]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    formatEdges(fallbackData.journeyGraph.edges, isMobile)
  );

  const [rawGraph, setRawGraph] = useState(fallbackData.journeyGraph);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedNodeData, setSelectedNodeData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto-adapt layout on screen resize
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const mobile = window.innerWidth < 768;
        if (mobile !== isMobile) {
          setIsMobile(mobile);
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [isMobile]);

  // Re-calculate node positions and edge handles whenever isMobile or filter changes
  useEffect(() => {
    const sourceData = rawGraph || fallbackData.journeyGraph;
    let baseNodes = sourceData.nodes || [];

    if (activeFilter !== 'all') {
      baseNodes = baseNodes.filter((n) => n.data?.category === activeFilter);
    }

    const adaptedNodes = isMobile ? getMobileNodes(baseNodes) : getDesktopNodes(baseNodes);
    const nodeIds = new Set(adaptedNodes.map((n) => n.id));
    const relevantEdges = (sourceData.edges || []).filter(
      (e) => nodeIds.has(e.source) || nodeIds.has(e.target)
    );

    setNodes(adaptedNodes);
    setEdges(formatEdges(relevantEdges, isMobile));

    const timer = setTimeout(() => {
      fitView({ padding: isMobile ? 0.15 : 0.25, duration: 500 });
    }, 80);

    return () => clearTimeout(timer);
  }, [isMobile, activeFilter, rawGraph, fitView, setNodes, setEdges]);

  // Load graph data from backend API
  const loadGraph = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getJourneyGraph();
      const graphData = (res.data?.nodes && res.data.nodes.length > 0)
        ? res.data
        : fallbackData.journeyGraph;

      setRawGraph(graphData);
      const adapted = isMobile ? getMobileNodes(graphData.nodes) : getDesktopNodes(graphData.nodes);
      setNodes(adapted);
      setEdges(formatEdges(graphData.edges, isMobile));

      setTimeout(() => {
        fitView({ padding: isMobile ? 0.15 : 0.25, duration: 600 });
      }, 100);
    } catch (err) {
      console.warn('Backend unavailable, using cached journey graph', err);
    } finally {
      setLoading(false);
    }
  }, [isMobile, fitView, setNodes, setEdges]);

  const handleFilter = (filterKey) => {
    setActiveFilter(filterKey);
  };

  const handleResetLayout = () => {
    setActiveFilter('all');
    setTimeout(() => {
      fitView({ padding: isMobile ? 0.15 : 0.25, duration: 600 });
    }, 100);
  };

  const onNodeClick = (_, node) => {
    setSelectedNodeData(node.data);
  };

  return (
    <>
      {/* Toolbar & Filters (Responsive Wrap) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4 bg-slate-900/60 p-3 rounded-2xl border border-slate-800 backdrop-blur-md">
        
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs text-slate-400 font-medium mr-1.5 hidden xs:flex items-center gap-1 shrink-0">
            <Layers size={13} />
          </span>
          {[
            { id: 'all', label: 'All Journey' },
            { id: 'education', label: 'Education' },
            { id: 'skill', label: 'Skills' },
            { id: 'project', label: 'Projects' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => handleFilter(btn.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === btn.id
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30 font-semibold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700/80'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Orientation Indicator & Reset Action */}
        <div className="flex items-center justify-between sm:justify-end gap-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
          <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800">
            {isMobile ? <Smartphone size={12} className="text-brand-400" /> : <Monitor size={12} className="text-emerald-400" />}
            <span>{isMobile ? 'Mobile Flow' : 'Desktop Flow'}</span>
          </span>

          <button
            onClick={handleResetLayout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 hover:border-slate-600 transition"
            title="Reset Graph View & Center"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            Reset View
          </button>
        </div>
      </div>

      {/* React Flow Viewport Canvas (Mobile Optimized Dimensions) */}
      <div className="relative w-full h-[540px] xs:h-[580px] sm:h-[660px] rounded-3xl border border-slate-800 bg-[#0b0f19] overflow-hidden shadow-2xl">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: isMobile ? 0.15 : 0.25 }}
          minZoom={0.15}
          maxZoom={2.2}
          panOnDrag={true}
          zoomOnPinch={true}
          zoomOnScroll={false}
          preventScrolling={false}
          style={{ width: '100%', height: '100%' }}
        >
          <Background color="#1e293b" gap={isMobile ? 16 : 22} size={1.2} />
          
          {/* Controls visible on all screens */}
          <Controls 
            className="!bg-slate-900 !border-slate-700 !shadow-xl !top-4 !left-4 !bottom-auto !transform-none" 
            showInteractive={false} 
          />
          
          {/* MiniMap hidden on small phones to save screen real-estate */}
          <MiniMap
            nodeStrokeColor={(n) => n.data?.color || '#6366f1'}
            nodeColor={(n) => `${n.data?.color || '#6366f1'}40`}
            nodeBorderRadius={8}
            className="!bg-slate-900 !border-slate-800 hidden md:block"
          />
        </ReactFlow>

        {/* Floating Node Details (Responsive: Bottom-Sheet Drawer on Mobile, Card on Desktop) */}
        {selectedNodeData && (
          <div className="absolute z-30 transition-all animate-fadeIn bottom-3 left-3 right-3 sm:bottom-auto sm:left-auto sm:top-4 sm:right-4 sm:max-w-sm bg-slate-900/95 border border-slate-700/80 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Info size={15} className="text-brand-400" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  {selectedNodeData.category} Information
                </span>
              </div>
              <button
                onClick={() => setSelectedNodeData(null)}
                className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded hover:bg-slate-800 transition"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="mt-3">
              <h4 className="text-sm sm:text-base font-bold text-white">{selectedNodeData.label}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{selectedNodeData.subLabel}</p>
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-emerald-400">
                <CheckCircle2 size={13} />
                <span>Verified in Ashish's Academic / Technical Records</span>
              </div>
            </div>
          </div>
        )}

        {/* Legend Hint Overlay (Adapts cleanly on mobile) */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-3 sm:gap-4 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[10px] sm:text-xs text-slate-400 z-10 pointer-events-none">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span> Edu
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Skills
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Projects
          </span>
          <span className="hidden xs:inline-block text-[11px] text-slate-500 ml-1">
            • Pinch or drag to explore
          </span>
        </div>
      </div>
    </>
  );
}

export default function JourneyFlow() {
  return (
    <section id="journey" className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-3">
          <Network size={14} className="animate-spin-slow" />
          Interactive Graph Visualization
        </div>
        <h2 className="text-2xl sm:text-5xl font-extrabold text-white tracking-tight">
          Skills & Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-300 to-purple-400">Knowledge Map</span>
        </h2>
        <p className="mt-3 text-xs sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Interactive map connecting my academic credentials (<strong className="text-purple-300">C-DAC Pune</strong> & <strong className="text-blue-300">COER</strong>) to technical skills and production applications (<strong className="text-emerald-400">ECOLIFT</strong> & <strong className="text-sky-400">Wanderlust</strong>).
        </p>
      </div>

      {/* ReactFlowProvider wrapper */}
      <ReactFlowProvider>
        <JourneyCanvas />
      </ReactFlowProvider>
    </section>
  );
}
