package ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command;

import lombok.RequiredArgsConstructor;
import ro.utcn.sd.mca.SD2019StackOverflowApp.dto.AnswerDTO;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.CanDeleteOnlyOwnAnswersException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidAnswerIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidSOUserIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.AnswerManagementService;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.SOUserManagementService;

@RequiredArgsConstructor
public class DeleteAnswerCommand implements Command {
    private final AnswerManagementService answerManagementService;
    private final SOUserManagementService sOUserManagementService;
    private final Integer answerId;

    @Override
    public AnswerDTO execute() throws InvalidAnswerIdException, InvalidSOUserIdException, CanDeleteOnlyOwnAnswersException {
        boolean success = answerManagementService.deleteAnswer(sOUserManagementService.loadCurrentSOUser().getId(), answerId);
        if (success) {
            AnswerDTO answerDTO = new AnswerDTO();
            answerDTO.setId(answerId);
            return answerDTO;
        } else {
            throw new CanDeleteOnlyOwnAnswersException();
        }
    }
}
