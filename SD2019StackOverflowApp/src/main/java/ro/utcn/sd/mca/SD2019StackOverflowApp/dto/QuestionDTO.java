package ro.utcn.sd.mca.SD2019StackOverflowApp.dto;

import lombok.Data;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.QuestionInfo;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.Tag;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class QuestionDTO {
    private Integer id;
    private String author;
    private String title;
    private String text;
    private String creationDateTime;
    private List<String> tags;
    private Integer voteScore;

    public static QuestionDTO ofEntity(QuestionInfo questionInfo) {
        QuestionDTO questionDTO = new QuestionDTO();
        questionDTO.setId(questionInfo.getQuestion().getId());
        questionDTO.setAuthor(questionInfo.getAuthor());
        questionDTO.setTitle(questionInfo.getQuestion().getTitle());
        questionDTO.setText(questionInfo.getQuestion().getText());
        questionDTO.setCreationDateTime(questionInfo.getQuestion().getCreationDateTime().toString());
        questionDTO.setTags(questionInfo.getTags().stream().map(Tag::getText).collect(Collectors.toList()));
        questionDTO.setVoteScore(questionInfo.getVotes());
        return questionDTO;
    }
}
