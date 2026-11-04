package com.ashish.portfolio.repository;

import com.ashish.portfolio.entity.JourneyNode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JourneyNodeRepository extends JpaRepository<JourneyNode, String> {
}
