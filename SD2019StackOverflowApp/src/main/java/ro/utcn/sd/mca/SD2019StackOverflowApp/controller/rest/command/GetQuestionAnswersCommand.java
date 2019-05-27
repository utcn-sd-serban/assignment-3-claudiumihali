package ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command;

import lombok.RequiredArgsConstructor;
import ro.utcn.sd.mca.SD2019StackOverflowApp.dto.AnswerDTO;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidQuestionIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidSOUserIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.AnswerManagementService;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class GetQuestionAnswersCommand implements Command {
    private final AnswerManagementService answerManagementService;
    private final Integer questionId;

    @Override
    public List<AnswerDTO> execute() throws InvalidQuestionIdException, InvalidSOUserIdException {
        return answerManagementService.getQuestionAnswers(questionId).stream().map(AnswerDTO::ofEntity).collect(Collectors.toList());
    }
}
