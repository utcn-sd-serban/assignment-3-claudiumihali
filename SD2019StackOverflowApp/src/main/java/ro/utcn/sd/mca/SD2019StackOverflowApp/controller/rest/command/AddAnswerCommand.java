package ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command;

import lombok.RequiredArgsConstructor;
import ro.utcn.sd.mca.SD2019StackOverflowApp.dto.AnswerDTO;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidQuestionIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidSOUserIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.AnswerManagementService;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.SOUserManagementService;

@RequiredArgsConstructor
public class AddAnswerCommand implements Command {
    private final AnswerManagementService answerManagementService;
    private final SOUserManagementService sOUserManagementService;
    private final Integer questionId;
    private final AnswerDTO answerDTO;

    @Override
    public AnswerDTO execute() throws InvalidQuestionIdException, InvalidSOUserIdException {
        return AnswerDTO.ofEntity(answerManagementService.addAnswer(questionId, sOUserManagementService.loadCurrentSOUser().getId(), answerDTO.getText()));
    }
}
