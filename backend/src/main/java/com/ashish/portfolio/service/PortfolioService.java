package com.ashish.portfolio.service;

import com.ashish.portfolio.dto.GraphResponse;
import com.ashish.portfolio.entity.*;
import com.ashish.portfolio.repository.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PortfolioService {

    private final ProfileRepository profileRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final EducationRepository educationRepository;
    private final CertificationRepository certificationRepository;
    private final JourneyNodeRepository journeyNodeRepository;
    private final JourneyEdgeRepository journeyEdgeRepository;

    public PortfolioService(ProfileRepository profileRepository,
                            SkillRepository skillRepository,
                            ProjectRepository projectRepository,
                            EducationRepository educationRepository,
                            CertificationRepository certificationRepository,
                            JourneyNodeRepository journeyNodeRepository,
                            JourneyEdgeRepository journeyEdgeRepository) {
        this.profileRepository = profileRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.educationRepository = educationRepository;
        this.certificationRepository = certificationRepository;
        this.journeyNodeRepository = journeyNodeRepository;
        this.journeyEdgeRepository = journeyEdgeRepository;
    }

    public Optional<Profile> getProfile() {
        return profileRepository.findById(1L);
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    public List<Education> getAllEducation() {
        return educationRepository.findAll();
    }

    public List<Certification> getAllCertifications() {
        return certificationRepository.findAll();
    }

    public GraphResponse getJourneyGraph() {
        List<JourneyNode> nodes = journeyNodeRepository.findAll();
        List<JourneyEdge> edges = journeyEdgeRepository.findAll();

        List<GraphResponse.NodeDto> nodeDtos = new ArrayList<>();
        for (JourneyNode n : nodes) {
            Map<String, Object> data = new HashMap<>();
            data.put("label", n.getLabel());
            data.put("subLabel", n.getSubLabel());
            data.put("category", n.getCategory());
            data.put("icon", n.getIconName());
            data.put("color", n.getColor());

            nodeDtos.add(new GraphResponse.NodeDto(
                n.getNodeId(),
                n.getNodeType(),
                new GraphResponse.Position(n.getXPos(), n.getYPos()),
                data
            ));
        }

        List<GraphResponse.EdgeDto> edgeDtos = new ArrayList<>();
        for (JourneyEdge e : edges) {
            Map<String, Object> style = new HashMap<>();
            style.put("stroke", e.getStyleColor() != null ? e.getStyleColor() : "#6366f1");
            style.put("strokeWidth", 2);

            edgeDtos.add(new GraphResponse.EdgeDto(
                e.getEdgeId(),
                e.getSourceNodeId(),
                e.getTargetNodeId(),
                e.getLabel(),
                e.getAnimated() != null ? e.getAnimated() : true,
                style
            ));
        }

        return new GraphResponse(nodeDtos, edgeDtos);
    }
}
