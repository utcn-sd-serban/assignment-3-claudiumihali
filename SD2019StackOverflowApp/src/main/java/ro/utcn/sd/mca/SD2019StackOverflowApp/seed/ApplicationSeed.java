package ro.utcn.sd.mca.SD2019StackOverflowApp.seed;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.Question;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.QuestionTag;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.SOUser;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.Tag;
import ro.utcn.sd.mca.SD2019StackOverflowApp.persistence.RepositoryFactory;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class ApplicationSeed implements CommandLineRunner {
    private final RepositoryFactory repositoryFactory;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        SOUser u1 = repositoryFactory.createSOUserRepository().save(new SOUser(null, "u1", passwordEncoder.encode("u1")));
        SOUser u2 = repositoryFactory.createSOUserRepository().save(new SOUser(null, "u2", passwordEncoder.encode("u2")));

        Question q1 = repositoryFactory.createQuestionRepository().save(
                new Question(null, u1.getId(), "q1", "q1", LocalDateTime.now()));
        Question q2 = repositoryFactory.createQuestionRepository().save(
                new Question(null, u2.getId(), "q2", "q2", LocalDateTime.now()));
        Question q3 = repositoryFactory.createQuestionRepository().save(
                new Question(null, u1.getId(), "q3", "q3", LocalDateTime.now()));

        Tag tag1 = repositoryFactory.createTagRepository().save(new Tag(null, "tag1"));
        Tag tag2 = repositoryFactory.createTagRepository().save(new Tag(null, "tag2"));
        Tag tag3 = repositoryFactory.createTagRepository().save(new Tag(null, "tag3"));

        QuestionTag qt1 = repositoryFactory.createQuestionTagRepository().save(new QuestionTag(null, q1.getId(), tag1.getId()));
        QuestionTag qt2 = repositoryFactory.createQuestionTagRepository().save(new QuestionTag(null, q2.getId(), tag1.getId()));
        QuestionTag qt3 = repositoryFactory.createQuestionTagRepository().save(new QuestionTag(null, q2.getId(), tag2.getId()));
        QuestionTag qt4 = repositoryFactory.createQuestionTagRepository().save(new QuestionTag(null, q3.getId(), tag1.getId()));
        QuestionTag qt5 = repositoryFactory.createQuestionTagRepository().save(new QuestionTag(null, q3.getId(), tag2.getId()));
        QuestionTag qt6 = repositoryFactory.createQuestionTagRepository().save(new QuestionTag(null, q3.getId(), tag3.getId()));
    }
}
