package ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command;

import lombok.RequiredArgsConstructor;
import ro.utcn.sd.mca.SD2019StackOverflowApp.dto.SOUserDTO;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.SOUserManagementService;

@RequiredArgsConstructor
public class LogInCommand implements Command {
    private final SOUserManagementService sOUserManagementService;

    @Override
    public SOUserDTO execute() {
        return new SOUserDTO(null, sOUserManagementService.loadCurrentSOUser().getUsername(), null);
    }
}
