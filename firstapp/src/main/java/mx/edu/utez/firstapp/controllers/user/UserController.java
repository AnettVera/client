package mx.edu.utez.firstapp.controllers.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import mx.edu.utez.firstapp.config.ApiResponse;
import mx.edu.utez.firstapp.controllers.user.dto.UserDto;
import mx.edu.utez.firstapp.services.user.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"*"})
public class UserController {
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAll() {
       return service.findAll();
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse> register( @RequestBody UserDto dto) {
        return service.save(dto.toEntity());
    }

    @PatchMapping("/{userId}/status")
    public ResponseEntity<ApiResponse> changeStatus(@PathVariable Long userId,
                                                    @RequestParam boolean activate) {
        return service.changeStatus(userId, activate);
    }
}
