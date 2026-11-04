package com.ashish.portfolio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "journey_node")
public class JourneyNode {

    @Id
    private String nodeId;

    @Column(nullable = false)
    private String label;

    private String category; // education, skill, project
    private String subLabel;
    private Double xPos;
    private Double yPos;
    private String nodeType; // educationNode, skillNode, projectNode
    private String iconName;
    private String color;

    public JourneyNode() {}

    public JourneyNode(String nodeId, String label, String category, String subLabel, 
                       Double xPos, Double yPos, String nodeType, String iconName, String color) {
        this.nodeId = nodeId;
        this.label = label;
        this.category = category;
        this.subLabel = subLabel;
        this.xPos = xPos;
        this.yPos = yPos;
        this.nodeType = nodeType;
        this.iconName = iconName;
        this.color = color;
    }

    public String getNodeId() { return nodeId; }
    public void setNodeId(String nodeId) { this.nodeId = nodeId; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSubLabel() { return subLabel; }
    public void setSubLabel(String subLabel) { this.subLabel = subLabel; }

    public Double getXPos() { return xPos; }
    public void setXPos(Double xPos) { this.xPos = xPos; }

    public Double getYPos() { return yPos; }
    public void setYPos(Double yPos) { this.yPos = yPos; }

    public String getNodeType() { return nodeType; }
    public void setNodeType(String nodeType) { this.nodeType = nodeType; }

    public String getIconName() { return iconName; }
    public void setIconName(String iconName) { this.iconName = iconName; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
}
