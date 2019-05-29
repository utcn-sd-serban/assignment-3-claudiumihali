package ro.utcn.sd.mca.SD2019StackOverflowApp.dto;

import lombok.Data;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.QuestionVote;

@Data
public class QuestionVoteDTO {
    private Integer questionId;
    private String voteType;

    public static QuestionVoteDTO ofEntity(QuestionVote questionVote) {
        QuestionVoteDTO questionVoteDTO = new QuestionVoteDTO();
        questionVoteDTO.setQuestionId(questionVote.getQuestionId());
        questionVoteDTO.setVoteType(questionVote.getVoteType());
        return questionVoteDTO;
    }
}
