package mx.edu.utez.firstapp.models.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    //method queries
    //SELECT * FROM users WHERE username = ?
    Optional<User> findByUsername(String username);
    @Modifying
    @Query(value = "INSERT INTO user_roles(user_id, role_id) " +
            "VALUES ( :userId, :roleId )", nativeQuery = true)
    int saveUserRole(Long userId, Long roleId);
    @Query(value = "SELECT user_id FROM user_roles WHERE user_id = :userId AND " +
            "role_id = :roleId ", nativeQuery = true)
    Long getIdUserRoles(Long userId, Long roleId);

}
