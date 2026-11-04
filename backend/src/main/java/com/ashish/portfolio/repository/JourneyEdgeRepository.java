package com.ashish.portfolio.repository;

import com.ashish.portfolio.entity.JourneyEdge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JourneyEdgeRepository extends JpaRepository<JourneyEdge, String> {
}
