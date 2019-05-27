package ro.utcn.sd.mca.SD2019StackOverflowApp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.*;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidQuestionIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidSOUserIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.persistence.RepositoryFactory;
import ro.utcn.sd.mca.SD2019StackOverflowApp.persistence.Specification;
import ro.utcn.sd.mca.SD2019StackOverflowApp.persistence.SpecificationFactory;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class QuestionManagementService {
    private final RepositoryFactory repositoryFactory;
    private final SpecificationFactory specificationFactory;

    @Transactional
    public QuestionInfo addQuestion(Integer sOUserId, String title, String text, List<String> tags) throws InvalidSOUserIdException {
        Specification<SOUser> su = specificationFactory.createFindSOUserById(sOUserId);
        List<SOUser> lu = repositoryFactory.createSOUserRepository().query(su);
        if (lu.isEmpty())
            throw new InvalidSOUserIdException();

        LocalDateTime creationDateTime = LocalDateTime.now();

        Question q = repositoryFactory.createQuestionRepository().save(new Question(null, sOUserId, title, text, creationDateTime));

        List<Tag> finalTags = new ArrayList<>();
        for (String tag : tags) {
            Specification<Tag> st = specificationFactory.createFindTagByText(tag);
            List<Tag> lt = repositoryFactory.createTagRepository().query(st);
            if (lt.isEmpty()) {
                Tag t = repositoryFactory.createTagRepository().save(new Tag(null, tag));
                finalTags.add(t);
                repositoryFactory.createQuestionTagRepository().save(new QuestionTag(null, q.getId(), t.getId()));
            } else {
                finalTags.add(lt.get(0));
                repositoryFactory.createQuestionTagRepository().save(new QuestionTag(null, q.getId(), lt.get(0).getId()));
            }
        }

        return new QuestionInfo(q, lu.get(0).getUsername(), finalTags, 0);
    }

    @Transactional
    public Optional<QuestionVote> voteQuestion(Integer sOUserId, Integer questionId, VoteType voteType) throws InvalidSOUserIdException,
            InvalidQuestionIdException {
        Specification<SOUser> su = specificationFactory.createFindSOUserById(sOUserId);
        List<SOUser> lu = repositoryFactory.createSOUserRepository().query(su);
        if (lu.isEmpty())
            throw new InvalidSOUserIdException();

        Specification<Question> sq = specificationFactory.createFindQuestionById(questionId);
        List<Question> lq = repositoryFactory.createQuestionRepository().query(sq);
        if (lq.isEmpty())
            throw new InvalidQuestionIdException();

        if (sOUserId.equals(lq.get(0).getSOUserId()))
            return Optional.empty();

        Specification<QuestionVote> sqv = specificationFactory.createFindSOUserQuestionVote(sOUserId, questionId);
        List<QuestionVote> lqv = repositoryFactory.createQuestionVoteRepository().query(sqv);
        if (lqv.isEmpty()) {
            return Optional.of(repositoryFactory.createQuestionVoteRepository().save(new QuestionVote(null, sOUserId, questionId,
                    voteType.getDatabaseText())));
        } else {
            String userVote = lqv.get(0).getVoteType();
            if (userVote.equals(voteType.getDatabaseText())) {
                return Optional.empty();
            } else {
                return Optional.of(repositoryFactory.createQuestionVoteRepository().save(new QuestionVote(lqv.get(0).getId(), sOUserId, questionId,
                        voteType.getDatabaseText())));
            }
        }
    }

    @Transactional
    public QuestionInfo getQuestionInfo(Integer questionId) throws InvalidQuestionIdException, InvalidSOUserIdException {
        Specification<Question> sq = specificationFactory.createFindQuestionById(questionId);
        List<Question> lq = repositoryFactory.createQuestionRepository().query(sq);
        if (lq.isEmpty())
            throw new InvalidQuestionIdException();

        Question q = lq.get(0);

        Specification<SOUser> su = specificationFactory.createFindSOUserById(q.getSOUserId());
        List<SOUser> lUser = repositoryFactory.createSOUserRepository().query(su);
        if (lUser.isEmpty())
            throw new InvalidSOUserIdException();
        String author = lUser.get(0).getUsername();

        Specification<Tag> st = specificationFactory.createFindQuestionTags(questionId);
        List<Tag> lt = repositoryFactory.createTagRepository().query(st);

        Specification<QuestionVote> sqv = specificationFactory.createFindQuestionVotes(questionId, VoteType.UPVOTE);
        List<QuestionVote> lu = repositoryFactory.createQuestionVoteRepository().query(sqv);

        sqv = specificationFactory.createFindQuestionVotes(questionId, VoteType.DOWNVOTE);
        List<QuestionVote> ld = repositoryFactory.createQuestionVoteRepository().query(sqv);

        Integer votes = lu.size() - ld.size();

        return new QuestionInfo(q, author, lt, votes);
    }

    @Transactional
    public List<QuestionInfo> getAllQuestions() throws InvalidSOUserIdException {
        List<QuestionInfo> qil = new ArrayList<>();

        Specification<Question> sq = specificationFactory.createFindAllQuestions();
        List<Question> lq = repositoryFactory.createQuestionRepository().query(sq);

        Specification<Tag> st;
        Specification<QuestionVote> sqv;
        Specification<SOUser> su;
        for (Question q : lq) {
            su = specificationFactory.createFindSOUserById(q.getSOUserId());
            List<SOUser> lUser = repositoryFactory.createSOUserRepository().query(su);
            if (lUser.isEmpty())
                throw new InvalidSOUserIdException();

            st = specificationFactory.createFindQuestionTags(q.getId());
            List<Tag> lt = repositoryFactory.createTagRepository().query(st);

            sqv = specificationFactory.createFindQuestionVotes(q.getId(), VoteType.UPVOTE);
            List<QuestionVote> lu = repositoryFactory.createQuestionVoteRepository().query(sqv);

            sqv = specificationFactory.createFindQuestionVotes(q.getId(), VoteType.DOWNVOTE);
            List<QuestionVote> ld = repositoryFactory.createQuestionVoteRepository().query(sqv);

            Integer votes = lu.size() - ld.size();

            qil.add(new QuestionInfo(q, lUser.get(0).getUsername(), lt, votes));
        }

        return qil;
    }

    @Transactional
    public List<QuestionInfo> getQuestionsByTitle(String title) throws InvalidSOUserIdException {
        List<QuestionInfo> qil = new ArrayList<>();

        Specification<Question> sq = specificationFactory.createFindQuestionByTitle(title);
        List<Question> lq = repositoryFactory.createQuestionRepository().query(sq);

        Specification<Tag> st;
        Specification<QuestionVote> sqv;
        Specification<SOUser> su;
        for (Question q : lq) {
            su = specificationFactory.createFindSOUserById(q.getSOUserId());
            List<SOUser> lUser = repositoryFactory.createSOUserRepository().query(su);
            if (lUser.isEmpty())
                throw new InvalidSOUserIdException();

            st = specificationFactory.createFindQuestionTags(q.getId());
            List<Tag> lt = repositoryFactory.createTagRepository().query(st);

            sqv = specificationFactory.createFindQuestionVotes(q.getId(), VoteType.UPVOTE);
            List<QuestionVote> lu = repositoryFactory.createQuestionVoteRepository().query(sqv);

            sqv = specificationFactory.createFindQuestionVotes(q.getId(), VoteType.DOWNVOTE);
            List<QuestionVote> ld = repositoryFactory.createQuestionVoteRepository().query(sqv);

            Integer votes = lu.size() - ld.size();

            qil.add(new QuestionInfo(q, lUser.get(0).getUsername(), lt, votes));
        }

        return qil;
    }

    @Transactional
    public List<QuestionInfo> getQuestionsByTags(List<String> tags) throws InvalidSOUserIdException {
        List<QuestionInfo> qil = new ArrayList<>();

        List<Tag> tl = new ArrayList<>();
        Specification<Tag> st;
        for (String tag : tags) {
            st = specificationFactory.createFindTagByText(tag);
            List<Tag> t = repositoryFactory.createTagRepository().query(st);
            tl.addAll(t);
        }

        List<Question> ql = new ArrayList<>();
        Specification<Question> sq;
        for (Tag tag : tl) {
            sq = specificationFactory.createFindQuestionByTagId(tag.getId());
            List<Question> q = repositoryFactory.createQuestionRepository().query(sq);
            if (ql.isEmpty()) {
                ql.addAll(q);
            } else {
                ql.retainAll(q);
            }
        }

        ql.sort((q1, q2) -> q2.getCreationDateTime().compareTo(q1.getCreationDateTime()));

        Specification<QuestionVote> sqv;
        Specification<SOUser> su;
        for (Question q : ql) {
            su = specificationFactory.createFindSOUserById(q.getSOUserId());
            List<SOUser> lUser = repositoryFactory.createSOUserRepository().query(su);
            if (lUser.isEmpty())
                throw new InvalidSOUserIdException();

            st = specificationFactory.createFindQuestionTags(q.getId());
            List<Tag> lt = repositoryFactory.createTagRepository().query(st);

            sqv = specificationFactory.createFindQuestionVotes(q.getId(), VoteType.UPVOTE);
            List<QuestionVote> lu = repositoryFactory.createQuestionVoteRepository().query(sqv);

            sqv = specificationFactory.createFindQuestionVotes(q.getId(), VoteType.DOWNVOTE);
            List<QuestionVote> ld = repositoryFactory.createQuestionVoteRepository().query(sqv);

            Integer votes = lu.size() - ld.size();

            qil.add(new QuestionInfo(q, lUser.get(0).getUsername(), lt, votes));
        }

        return qil;
    }
}
