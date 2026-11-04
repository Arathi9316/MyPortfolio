import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { 
  GraduationCap, 
  Award, 
  Coffee, 
  Leaf, 
  Atom, 
  Database, 
  Box, 
  Car, 
  Compass, 
  Code2, 
  Sparkles 
} from 'lucide-react';

const iconMap = {
  GraduationCap,
  Award,
  Coffee,
  Leaf,
  Atom,
  Database,
  Box,
  Car,
  Compass,
};

export const EducationNode = ({ data, selected }) => {
  const IconComponent = iconMap[data?.icon] || GraduationCap;
  const accentColor = data?.color || '#8b5cf6';

  return (
    <div
      className={`relative px-3.5 py-3 rounded-xl border bg-slate-900/95 backdrop-blur-md shadow-xl transition-all duration-300 w-[220px] sm:w-[240px] cursor-grab active:cursor-grabbing ${
        selected ? 'ring-2 ring-purple-400 shadow-purple-500/25 border-purple-500' : 'border-slate-700/80 hover:border-purple-500/60'
      }`}
      style={{
        boxShadow: `0 8px 24px -6px ${accentColor}25`
      }}
    >
      <div className="flex items-center gap-3">
        <div 
          className="p-2 rounded-lg text-white shrink-0"
          style={{ backgroundColor: `${accentColor}25`, border: `1px solid ${accentColor}50` }}
        >
          <IconComponent size={18} style={{ color: accentColor }} />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800/40">
            Education
          </span>
          <h4 className="text-xs sm:text-sm font-semibold text-white mt-1 truncate">{data?.label}</h4>
          <p className="text-[11px] text-slate-400 truncate">{data?.subLabel}</p>
        </div>
      </div>

      {/* Desktop Source: Right */}
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        className="!w-3 !h-3 !bg-purple-500 !border-2 !border-slate-900"
        style={{ right: -6, zIndex: 20 }}
      />
      {/* Mobile Source: Bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="source-bottom"
        className="!w-3 !h-3 !bg-purple-500 !border-2 !border-slate-900"
        style={{ bottom: -6, zIndex: 20 }}
      />
    </div>
  );
};

export const SkillNode = ({ data, selected }) => {
  const IconComponent = iconMap[data?.icon] || Code2;
  const accentColor = data?.color || '#3b82f6';

  return (
    <div
      className={`relative px-3.5 py-3 rounded-xl border bg-slate-900/95 backdrop-blur-md shadow-xl transition-all duration-300 w-[210px] sm:w-[230px] cursor-grab active:cursor-grabbing ${
        selected ? 'ring-2 ring-indigo-400 shadow-indigo-500/25 border-indigo-500' : 'border-slate-700/80 hover:border-indigo-500/60'
      }`}
      style={{
        boxShadow: `0 8px 24px -6px ${accentColor}25`
      }}
    >
      {/* Desktop Target: Left */}
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-slate-900"
        style={{ left: -6, zIndex: 20 }}
      />
      {/* Mobile Target: Top */}
      <Handle
        type="target"
        position={Position.Top}
        id="target-top"
        className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-slate-900"
        style={{ top: -6, zIndex: 20 }}
      />

      <div className="flex items-center gap-3">
        <div 
          className="p-2 rounded-lg text-white shrink-0"
          style={{ backgroundColor: `${accentColor}25`, border: `1px solid ${accentColor}50` }}
        >
          <IconComponent size={16} style={{ color: accentColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h4 className="text-xs sm:text-sm font-semibold text-white truncate">{data?.label}</h4>
            <Sparkles size={11} className="text-indigo-400 shrink-0" />
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">{data?.subLabel}</p>
        </div>
      </div>

      {/* Desktop Source: Right */}
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-slate-900"
        style={{ right: -6, zIndex: 20 }}
      />
      {/* Mobile Source: Bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="source-bottom"
        className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-slate-900"
        style={{ bottom: -6, zIndex: 20 }}
      />
    </div>
  );
};

export const ProjectNode = ({ data, selected }) => {
  const IconComponent = iconMap[data?.icon] || Car;
  const accentColor = data?.color || '#10b981';

  return (
    <div
      className={`relative px-3.5 py-3 rounded-xl border bg-slate-900/95 backdrop-blur-md shadow-xl transition-all duration-300 w-[230px] sm:w-[250px] cursor-grab active:cursor-grabbing ${
        selected ? 'ring-2 ring-emerald-400 shadow-emerald-500/25 border-emerald-500' : 'border-slate-700/80 hover:border-emerald-500/60'
      }`}
      style={{
        boxShadow: `0 8px 28px -6px ${accentColor}30`
      }}
    >
      {/* Desktop Target: Left */}
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-slate-900"
        style={{ left: -6, zIndex: 20 }}
      />
      {/* Mobile Target: Top */}
      <Handle
        type="target"
        position={Position.Top}
        id="target-top"
        className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-slate-900"
        style={{ top: -6, zIndex: 20 }}
      />

      <div className="flex items-start gap-2.5">
        <div 
          className="p-2 rounded-lg text-white mt-0.5 shrink-0"
          style={{ backgroundColor: `${accentColor}25`, border: `1px solid ${accentColor}50` }}
        >
          <IconComponent size={18} style={{ color: accentColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
              Project
            </span>
            <span className="text-[9px] text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live
            </span>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-white mt-1 tracking-tight truncate">{data?.label}</h4>
          <p className="text-[11px] text-slate-300 mt-0.5 leading-snug line-clamp-2">{data?.subLabel}</p>
        </div>
      </div>
    </div>
  );
};
