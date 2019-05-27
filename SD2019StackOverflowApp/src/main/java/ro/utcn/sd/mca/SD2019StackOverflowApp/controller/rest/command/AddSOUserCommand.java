package ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import ro.utcn.sd.mca.SD2019StackOverflowApp.dto.SOUserDTO;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.SOUser;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.DuplicateUsernameException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.SOUserManagementService;

import java.util.Optional;

@RequiredArgsConstructor
public class AddSOUserCommand implements Command {
    private final SOUserManagementService sOUserManagementService;
    private final SOUserDTO sOUserDTO;
    private final PasswordEncoder passwordEncoder;

    @Override
    public SOUserDTO execute() throws DuplicateUsernameException {
        Optional<SOUser> sOUser = sOUserManagementService.addUser(sOUserDTO.getUsername(), passwordEncoder.encode(sOUserDTO.getPassword()));
        if (sOUser.isPresent()) {
            return SOUserDTO.ofEntity(sOUser.get());
        } else {
            throw new DuplicateUsernameException();
        }
    }
}
