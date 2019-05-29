package ro.utcn.sd.mca.SD2019StackOverflowApp.dto;

import lombok.Data;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.AnswerVote;

@Data
public class AnswerVoteDTO {
    private Integer answerId;
    private String voteType;

    public static AnswerVoteDTO ofEntity(AnswerVote answerVote) {
        AnswerVoteDTO answerVoteDTO = new AnswerVoteDTO();
        answerVoteDTO.setAnswerId(answerVote.getAnswerId());
        answerVoteDTO.setVoteType(answerVote.getVoteType());
        return answerVoteDTO;
    }
}
