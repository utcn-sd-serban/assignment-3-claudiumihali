package ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command;

import lombok.RequiredArgsConstructor;
import ro.utcn.sd.mca.SD2019StackOverflowApp.dto.AnswerVoteDTO;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.AnswerVote;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.VoteType;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.CannotVoteOwnAnswersOrTwiceException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidAnswerIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidSOUserIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.AnswerManagementService;
import ro.utcn.sd.mca.SD2019StackOverflowApp.service.SOUserManagementService;

import java.util.Optional;

@RequiredArgsConstructor
public class VoteAnswerCommand implements Command {
    private final AnswerManagementService answerManagementService;
    private final SOUserManagementService sOUserManagementService;
    private final Integer answerId;
    private final AnswerVoteDTO answerVoteDTO;

    @Override
    public AnswerVoteDTO execute() throws InvalidAnswerIdException, InvalidSOUserIdException, CannotVoteOwnAnswersOrTwiceException {
        VoteType voteType = null;
        if (answerVoteDTO.getVoteType().equals(VoteType.UPVOTE.getDatabaseText())) {
            voteType = VoteType.UPVOTE;
        } else if (answerVoteDTO.getVoteType().equals(VoteType.DOWNVOTE.getDatabaseText())) {
            voteType = VoteType.DOWNVOTE;
        }
        Optional<AnswerVote> answerVote = answerManagementService.voteAnswer(sOUserManagementService.loadCurrentSOUser().getId(),
                answerId, voteType);
        if (answerVote.isPresent()) {
            return AnswerVoteDTO.ofEntity(answerVote.get());
        } else {
            throw new CannotVoteOwnAnswersOrTwiceException();
        }
    }
}
