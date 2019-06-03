package ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command;

import lombok.RequiredArgsConstructor;
import ro.utcn.sd.mca.SD2019StackOverflowApp.dto.QuestionVoteDTO;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.QuestionVote;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.VoteType;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.CannotVoteOwnQuestionsOrTwiceException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidQuestionIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidSOUserIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.QuestionManagementService;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.SOUserManagementService;

import java.util.Optional;

@RequiredArgsConstructor
public class VoteQuestionCommand implements Command {
    private final QuestionManagementService questionManagementService;
    private final SOUserManagementService sOUserManagementService;
    private final Integer questionId;
    private final QuestionVoteDTO questionVoteDTO;

    @Override
    public QuestionVoteDTO execute() throws InvalidQuestionIdException, InvalidSOUserIdException, CannotVoteOwnQuestionsOrTwiceException {
        VoteType voteType = null;
        if (questionVoteDTO.getVoteType().equals(VoteType.UPVOTE.getDatabaseText())) {
            voteType = VoteType.UPVOTE;
        } else if (questionVoteDTO.getVoteType().equals(VoteType.DOWNVOTE.getDatabaseText())) {
            voteType = VoteType.DOWNVOTE;
        }
        Optional<QuestionVote> questionVote = questionManagementService.voteQuestion(sOUserManagementService.loadCurrentSOUser().getId(),
                questionId, voteType);
        if (questionVote.isPresent()) {
            return QuestionVoteDTO.ofEntity(questionVote.get());
        } else {
            throw new CannotVoteOwnQuestionsOrTwiceException();
        }
    }
}
