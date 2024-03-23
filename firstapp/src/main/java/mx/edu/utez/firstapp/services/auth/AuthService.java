package mx.edu.utez.firstapp.services.auth;

import mx.edu.utez.firstapp.config.ApiResponse;
import mx.edu.utez.firstapp.controllers.auth.dto.SignedDto;
import mx.edu.utez.firstapp.models.user.User;
import mx.edu.utez.firstapp.security.jwt.JwtProvider;
import mx.edu.utez.firstapp.services.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AuthService {
    private final UserService service;
    private final AuthenticationManager manager;
    private final JwtProvider provider;

    public AuthService(UserService service, AuthenticationManager manager, JwtProvider provider) {
        this.service = service;
        this.manager = manager;
        this.provider = provider;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> signIn(String username, String password) {
        try {
            Optional<User> foundUser = service.findUserByUsername(username);
            if (foundUser.isEmpty())
                return new ResponseEntity<>(
                        new ApiResponse(HttpStatus.NOT_FOUND, true, "UserNotFound"),
                        HttpStatus.BAD_REQUEST);
            User user = foundUser.get();
            if (!user.getStatus())
                return new ResponseEntity<>(
                        new ApiResponse(HttpStatus.UNAUTHORIZED, true, "Inactive"),
                        HttpStatus.BAD_REQUEST);
            if (!user.getBlocked())
                return new ResponseEntity<>(
                        new ApiResponse(HttpStatus.UNAUTHORIZED, true, "Blocked"),
                        HttpStatus.BAD_REQUEST);

            Authentication auth = manager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
            String token = provider.generateToken(auth);
            //SignedDto (token, username, id, fullname, role)
            SignedDto signedDto = new SignedDto(token, "Bearer", user, user.getRoles().stream().toList());
            return new ResponseEntity<>(
                    new ApiResponse(signedDto, HttpStatus.OK),
                    HttpStatus.OK
            );
        } catch (Exception e) {
            String message = "CredentialsMismatch";
            if (e instanceof DisabledException)
                message = "UserDisabled";
            return new ResponseEntity<>(
                    new ApiResponse(HttpStatus.BAD_REQUEST, true, message),
                    HttpStatus.BAD_REQUEST
            );
        }
    }
}
