package ro.utcn.sd.mca.SD2019StackOverflowApp.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class QuestionInfo {
    private Question question;
    private String author;
    private List<Tag> tags;
    private Integer votes;
}
