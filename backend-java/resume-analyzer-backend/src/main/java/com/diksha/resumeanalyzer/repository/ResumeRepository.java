package com.diksha.resumeanalyzer.repository;

import com.diksha.resumeanalyzer.entity.Resume;
import com.diksha.resumeanalyzer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    List<Resume> findByUserOrderByUploadTimeDesc(User user);

}