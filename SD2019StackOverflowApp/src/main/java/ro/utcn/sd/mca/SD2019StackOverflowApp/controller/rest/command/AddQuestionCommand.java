package ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command;

import lombok.RequiredArgsConstructor;
import ro.utcn.sd.mca.SD2019StackOverflowApp.dto.QuestionDTO;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidSOUserIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.QuestionManagementService;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.SOUserManagementService;

@RequiredArgsConstructor
public class AddQuestionCommand implements Command {
    private final QuestionManagementService questionManagementService;
    private final SOUserManagementService sOUserManagementService;
    private final QuestionDTO questionDTO;

    @Override
    public QuestionDTO execute() throws InvalidSOUserIdException {
        return QuestionDTO.ofEntity(questionManagementService.addQuestion(sOUserManagementService.loadCurrentSOUser().getId(),
                questionDTO.getTitle(), questionDTO.getText(), questionDTO.getTags()));
    }
}
