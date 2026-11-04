package com.ashish.portfolio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "journey_edge")
public class JourneyEdge {

    @Id
    private String edgeId;

    @Column(nullable = false)
    private String sourceNodeId;

    @Column(nullable = false)
    private String targetNodeId;

    private String label;
    private Boolean animated = true;
    private String styleColor;

    public JourneyEdge() {}

    public JourneyEdge(String edgeId, String sourceNodeId, String targetNodeId, String label, Boolean animated, String styleColor) {
        this.edgeId = edgeId;
        this.sourceNodeId = sourceNodeId;
        this.targetNodeId = targetNodeId;
        this.label = label;
        this.animated = animated;
        this.styleColor = styleColor;
    }

    public String getEdgeId() { return edgeId; }
    public void setEdgeId(String edgeId) { this.edgeId = edgeId; }

    public String getSourceNodeId() { return sourceNodeId; }
    public void setSourceNodeId(String sourceNodeId) { this.sourceNodeId = sourceNodeId; }

    public String getTargetNodeId() { return targetNodeId; }
    public void setTargetNodeId(String targetNodeId) { this.targetNodeId = targetNodeId; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public Boolean getAnimated() { return animated; }
    public void setAnimated(Boolean animated) { this.animated = animated; }

    public String getStyleColor() { return styleColor; }
    public void setStyleColor(String styleColor) { this.styleColor = styleColor; }
}
