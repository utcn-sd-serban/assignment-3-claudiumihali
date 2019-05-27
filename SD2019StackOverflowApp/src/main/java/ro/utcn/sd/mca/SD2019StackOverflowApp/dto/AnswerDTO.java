package ro.utcn.sd.mca.SD2019StackOverflowApp.dto;

import lombok.Data;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.AnswerInfo;

@Data
public class AnswerDTO {
    private Integer id;
    private Integer questionId;
    private String author;
    private String text;
    private String creationDateTime;
    private Integer voteScore;

    public static AnswerDTO ofEntity(AnswerInfo answerInfo) {
        AnswerDTO answerDTO = new AnswerDTO();
        answerDTO.setId(answerInfo.getAnswer().getId());
        answerDTO.setQuestionId(answerInfo.getAnswer().getQuestionId());
        answerDTO.setAuthor(answerInfo.getAuthor());
        answerDTO.setText(answerInfo.getAnswer().getText());
        answerDTO.setCreationDateTime(answerInfo.getAnswer().getCreationDateTime().toString());
        answerDTO.setVoteScore(answerInfo.getVotes());
        return answerDTO;
    }
}
