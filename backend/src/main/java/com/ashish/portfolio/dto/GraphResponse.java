package com.ashish.portfolio.dto;

import java.util.List;
import java.util.Map;

public class GraphResponse {

    private List<NodeDto> nodes;
    private List<EdgeDto> edges;

    public GraphResponse() {}

    public GraphResponse(List<NodeDto> nodes, List<EdgeDto> edges) {
        this.nodes = nodes;
        this.edges = edges;
    }

    public List<NodeDto> getNodes() { return nodes; }
    public void setNodes(List<NodeDto> nodes) { this.nodes = nodes; }

    public List<EdgeDto> getEdges() { return edges; }
    public void setEdges(List<EdgeDto> edges) { this.edges = edges; }

    public static class NodeDto {
        private String id;
        private String type;
        private Position position;
        private Map<String, Object> data;

        public NodeDto() {}

        public NodeDto(String id, String type, Position position, Map<String, Object> data) {
            this.id = id;
            this.type = type;
            this.position = position;
            this.data = data;
        }

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getType() { return type; }
        public void setType(String type) { this.type = type; }

        public Position getPosition() { return position; }
        public void setPosition(Position position) { this.position = position; }

        public Map<String, Object> getData() { return data; }
        public void setData(Map<String, Object> data) { this.data = data; }
    }

    public static class Position {
        private Double x;
        private Double y;

        public Position() {}

        public Position(Double x, Double y) {
            this.x = x;
            this.y = y;
        }

        public Double getX() { return x; }
        public void setX(Double x) { this.x = x; }

        public Double getY() { return y; }
        public void setY(Double y) { this.y = y; }
    }

    public static class EdgeDto {
        private String id;
        private String source;
        private String target;
        private String label;
        private Boolean animated;
        private Map<String, Object> style;

        public EdgeDto() {}

        public EdgeDto(String id, String source, String target, String label, Boolean animated, Map<String, Object> style) {
            this.id = id;
            this.source = source;
            this.target = target;
            this.label = label;
            this.animated = animated;
            this.style = style;
        }

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getSource() { return source; }
        public void setSource(String source) { this.source = source; }

        public String getTarget() { return target; }
        public void setTarget(String target) { this.target = target; }

        public String getLabel() { return label; }
        public void setLabel(String label) { this.label = label; }

        public Boolean getAnimated() { return animated; }
        public void setAnimated(Boolean animated) { this.animated = animated; }

        public Map<String, Object> getStyle() { return style; }
        public void setStyle(Map<String, Object> style) { this.style = style; }
    }
}
