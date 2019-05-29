package ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command.*;
import ro.utcn.sd.mca.SD2019StackOverflowApp.dto.AnswerDTO;
import ro.utcn.sd.mca.SD2019StackOverflowApp.dto.AnswerVoteDTO;
import ro.utcn.sd.mca.SD2019StackOverflowApp.event.EventType;
import ro.utcn.sd.mca.SD2019StackOverflowApp.event.WebSocketEvent;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.AnswerManagementService;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.SOUserManagementService;

@RestController
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerManagementService answerManagementService;
    private final SOUserManagementService sOUserManagementService;
    private final Invoker invoker;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("/questions/{questionId}/answers")
    public Object getQuestionAnswers(@PathVariable Integer questionId) throws Exception {
        return invoker.invoke(new GetQuestionAnswersCommand(answerManagementService, questionId));
    }

    @PostMapping("/questions/{questionId}/answers")
    public Object addAnswer(@PathVariable Integer questionId, @RequestBody AnswerDTO answerDTO) throws Exception {
        Object result = invoker.invoke(new AddAnswerCommand(answerManagementService, sOUserManagementService, questionId, answerDTO));
        messagingTemplate.convertAndSend("/topic/events", new WebSocketEvent(EventType.ANSWER_ADDED, result));
        return result;
    }

    @PutMapping("/questions/{questionId}/answers/{answerId}")
    public Object editAnswer(@PathVariable Integer questionId, @PathVariable Integer answerId, @RequestBody AnswerDTO answerDTO) throws Exception {
        Object result = invoker.invoke(new EditAnswerCommand(answerManagementService, sOUserManagementService, answerId, answerDTO));
        messagingTemplate.convertAndSend("/topic/events", new WebSocketEvent(EventType.ANSWER_EDITED, result));
        return result;
    }

    @DeleteMapping("/questions/{questionId}/answers/{answerId}")
    public Object deleteAnswer(@PathVariable Integer questionId, @PathVariable Integer answerId) throws Exception {
        Object result = invoker.invoke(new DeleteAnswerCommand(answerManagementService, sOUserManagementService, answerId));
        messagingTemplate.convertAndSend("/topic/events", new WebSocketEvent(EventType.ANSWER_DELETED, result));
        return result;
    }

    @PostMapping("/questions/{questionId}/answers/{answerId}/votes")
    public Object voteAnswer(@PathVariable Integer questionId, @PathVariable Integer answerId,
                             @RequestBody AnswerVoteDTO answerVoteDTO) throws Exception {
        Object result = invoker.invoke(new VoteAnswerCommand(answerManagementService, sOUserManagementService, answerId, answerVoteDTO));
        messagingTemplate.convertAndSend("/topic/events", new WebSocketEvent(EventType.ANSWER_VOTED, result));
        return result;
    }
}
