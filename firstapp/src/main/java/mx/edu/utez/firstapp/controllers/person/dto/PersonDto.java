package mx.edu.utez.firstapp.controllers.person.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.firstapp.controllers.user.dto.UserDto;
import mx.edu.utez.firstapp.models.person.Person;

import java.time.LocalDate;

@NoArgsConstructor
@Setter
@Getter
public class PersonDto {
    private Long id;
    private String name;
    private String surname;
    private String lastname;
    private LocalDate birthDate;
    private String curp;
    private UserDto user;

    public Person toEntity() {
        if (user == null)
            return new Person(name, surname, lastname, birthDate, curp);
        return new Person(id, name, surname, lastname, birthDate, curp, user.toEntity());
    }
}
