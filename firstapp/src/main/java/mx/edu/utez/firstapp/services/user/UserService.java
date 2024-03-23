package mx.edu.utez.firstapp.services.user;

import mx.edu.utez.firstapp.config.ApiResponse;
import mx.edu.utez.firstapp.models.role.RoleRepository;
import mx.edu.utez.firstapp.models.user.User;
import mx.edu.utez.firstapp.models.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
public class UserService {
    private final UserRepository repository;
    private final RoleRepository roleRepository;

    public UserService(UserRepository repository, RoleRepository roleRepository) {
        this.repository = repository;
        this.roleRepository = roleRepository;
    }

    @Transactional(readOnly = true)
    public Optional<User> findUserByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse>findAll(){
        return new ResponseEntity<>(
                new ApiResponse(repository.findAll(),HttpStatus.OK),
                HttpStatus.OK
        );
    }
    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(User user) {
        Optional<User> foundUser = repository.findByUsername(user.getUsername());
        if (foundUser.isPresent()) {
            // Usuario encontrado, actualizar estado a false para desactivar
            User existingUser = foundUser.get();
            existingUser.setStatus(false);
            repository.save(existingUser);
            return new ResponseEntity<>(new ApiResponse(existingUser, HttpStatus.OK), HttpStatus.OK);
        } else {
            // Usuario no encontrado, crear uno nuevo
            user.setStatus(true);
            user = repository.saveAndFlush(user);
            return new ResponseEntity<>(new ApiResponse(user, HttpStatus.OK), HttpStatus.OK);
        }
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> changeStatus(Long userId, boolean activate) {
        Optional<User> optionalUser = repository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setStatus(activate);
            repository.save(user);
            return new ResponseEntity<>(new ApiResponse(user, HttpStatus.OK), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "UserNotFound"), HttpStatus.NOT_FOUND);
        }
    }
}
