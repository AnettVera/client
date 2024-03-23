package mx.edu.utez.firstapp.controllers.auth.dto;

import lombok.Value;
import mx.edu.utez.firstapp.models.role.Role;
import mx.edu.utez.firstapp.models.user.User;

import java.util.List;

@Value
public class SignedDto {
    String token;
    String tokenType;
    User user;
    List<Role> roles;
}
