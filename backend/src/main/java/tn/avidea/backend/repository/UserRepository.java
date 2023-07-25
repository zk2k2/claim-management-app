package tn.avidea.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tn.avidea.backend.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByLogin(String login);

}