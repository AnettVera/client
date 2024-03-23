package mx.edu.utez.firstapp.controllers.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.firstapp.models.role.Role;
import mx.edu.utez.firstapp.models.user.User;

import java.util.Set;

@NoArgsConstructor
@Setter
@Getter
public class UserDto {
    private Long id;
    private String username;
    private String password;
    private String avatar;
    private Set<Role> roles;
    public User toEntity() {
        return new User(id, username, password, avatar, roles);
    }

}
