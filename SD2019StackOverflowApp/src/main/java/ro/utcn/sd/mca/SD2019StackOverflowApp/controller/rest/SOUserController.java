package ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command.AddSOUserCommand;
import ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command.Invoker;
import ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command.LogInCommand;
import ro.utcn.sd.mca.SD2019StackOverflowApp.dto.SOUserDTO;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.SOUserManagementService;

@RestController
@RequiredArgsConstructor
public class SOUserController {
    private final SOUserManagementService sOUserManagementService;
    private final Invoker invoker;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/sousers/login")
    public Object logIn() throws Exception {
        return invoker.invoke(new LogInCommand(sOUserManagementService));
    }

    @PostMapping("/sousers")
    public Object signUp(@RequestBody SOUserDTO sOUserDTO) throws Exception {
        return invoker.invoke(new AddSOUserCommand(sOUserManagementService, sOUserDTO, passwordEncoder));
    }
}
