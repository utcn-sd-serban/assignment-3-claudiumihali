package ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command;

import lombok.RequiredArgsConstructor;
import ro.utcn.sd.mca.SD2019StackOverflowApp.dto.AnswerDTO;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.AnswerInfo;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.CanEditOnlyOwnAnswersException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidAnswerIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidSOUserIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.AnswerManagementService;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.SOUserManagementService;

import java.util.Optional;

@RequiredArgsConstructor
public class EditAnswerCommand implements Command {
    private final AnswerManagementService answerManagementService;
    private final SOUserManagementService sOUserManagementService;
    private final Integer answerId;
    private final AnswerDTO answerDTO;

    @Override
    public AnswerDTO execute() throws InvalidAnswerIdException, InvalidSOUserIdException, CanEditOnlyOwnAnswersException {
        Optional<AnswerInfo> ai = answerManagementService.editAnswer(sOUserManagementService.loadCurrentSOUser().getId(), answerId, answerDTO.getText());
        if (ai.isPresent()) {
            return AnswerDTO.ofEntity(ai.get());
        } else {
            throw new CanEditOnlyOwnAnswersException();
        }
    }
}
