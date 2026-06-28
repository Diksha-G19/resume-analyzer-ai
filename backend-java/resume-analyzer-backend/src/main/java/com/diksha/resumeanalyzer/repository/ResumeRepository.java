package com.diksha.resumeanalyzer.repository;

import com.diksha.resumeanalyzer.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

}
