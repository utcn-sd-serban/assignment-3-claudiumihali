package ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command.AddAnswerCommand;
import ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command.EditAnswerCommand;
import ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command.GetQuestionAnswersCommand;
import ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command.Invoker;
import ro.utcn.sd.mca.SD2019StackOverflowApp.dto.AnswerDTO;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.AnswerManagementService;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.SOUserManagementService;

@RestController
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerManagementService answerManagementService;
    private final SOUserManagementService sOUserManagementService;
    private final Invoker invoker;

    @GetMapping("/questions/{questionId}/answers")
    public Object getQuestionAnswers(@PathVariable Integer questionId) throws Exception {
        return invoker.invoke(new GetQuestionAnswersCommand(answerManagementService, questionId));
    }

    @PostMapping("/questions/{questionId}/answers")
    public Object addAnswer(@PathVariable Integer questionId, @RequestBody AnswerDTO answerDTO) throws Exception {
        return invoker.invoke(new AddAnswerCommand(answerManagementService, sOUserManagementService, questionId, answerDTO));
    }

    @PutMapping("/questions/{questionId}/answers/{answerId}")
    public Object editAnswer(@PathVariable Integer questionId, @PathVariable Integer answerId, @RequestBody AnswerDTO answerDTO) throws Exception {
        return invoker.invoke(new EditAnswerCommand(answerManagementService, sOUserManagementService, answerId, answerDTO));
    }
}
