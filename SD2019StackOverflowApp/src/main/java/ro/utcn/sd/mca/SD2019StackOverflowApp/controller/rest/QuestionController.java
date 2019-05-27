package ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command.*;
import ro.utcn.sd.mca.SD2019StackOverflowApp.dto.QuestionDTO;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.QuestionManagementService;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.SOUserManagementService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionManagementService questionManagementService;
    private final SOUserManagementService sOUserManagementService;
    private final Invoker invoker;

    @GetMapping("/questions")
    public Object getAllQuestions(@RequestParam(required = false) String titleFilter,
                                  @RequestParam(required = false) List<String> tagFilters) throws Exception {
        if (titleFilter == null && tagFilters == null) {
            return invoker.invoke(new GetAllQuestionsCommand(questionManagementService));
        } else if (titleFilter != null){
            return invoker.invoke(new FilterQuestionsByTitleCommand(questionManagementService, titleFilter));
        } else {
            return invoker.invoke(new FilterQuestionsByTagsCommand(questionManagementService, tagFilters));
        }
    }

    @PostMapping("/questions")
    public Object addQuestion(@RequestBody QuestionDTO questionDTO) throws Exception {
        return invoker.invoke(new AddQuestionCommand(questionManagementService, sOUserManagementService, questionDTO));
    }
}
