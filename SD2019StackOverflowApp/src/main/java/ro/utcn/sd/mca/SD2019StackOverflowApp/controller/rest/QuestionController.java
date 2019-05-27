package ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command.AddQuestionCommand;
import ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command.FilterQuestionsByTitleCommand;
import ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command.GetAllQuestionsCommand;
import ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command.Invoker;
import ro.utcn.sd.mca.SD2019StackOverflowApp.dto.QuestionDTO;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.QuestionManagementService;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.SOUserManagementService;

@RestController
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionManagementService questionManagementService;
    private final SOUserManagementService sOUserManagementService;
    private final Invoker invoker;

    @GetMapping("/questions")
    public Object getAllQuestions(@RequestParam(required = false) String titleFilter) throws Exception {
        if (titleFilter == null) {
            return invoker.invoke(new GetAllQuestionsCommand(questionManagementService));
        } else {
            return invoker.invoke(new FilterQuestionsByTitleCommand(questionManagementService, titleFilter));
        }
    }

    @PostMapping("/questions")
    public Object addQuestion(@RequestBody QuestionDTO questionDTO) throws Exception {
        return invoker.invoke(new AddQuestionCommand(questionManagementService, sOUserManagementService, questionDTO));
    }
}
