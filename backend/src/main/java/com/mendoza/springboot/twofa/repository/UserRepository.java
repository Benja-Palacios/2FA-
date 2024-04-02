package com.mendoza.springboot.twofa.repository;

import com.mendoza.springboot.twofa.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
}
