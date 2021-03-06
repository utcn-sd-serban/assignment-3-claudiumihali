package ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command;

import lombok.RequiredArgsConstructor;
import ro.utcn.sd.mca.SD2019StackOverflowApp.dto.QuestionDTO;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidSOUserIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.QuestionManagementService;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class GetAllQuestionsCommand implements Command {
    private final QuestionManagementService questionManagementService;

    @Override
    public List<QuestionDTO> execute() throws InvalidSOUserIdException {
        return questionManagementService.getAllQuestions().stream().map(QuestionDTO::ofEntity).collect(Collectors.toList());
    }
}
