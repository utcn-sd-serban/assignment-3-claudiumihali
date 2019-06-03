package ro.utcn.sd.mca.SD2019StackOverflowApp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.*;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidAnswerIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidQuestionIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidSOUserIdException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.persistence.RepositoryFactory;
import ro.utcn.sd.mca.SD2019StackOverflowApp.persistence.Specification;
import ro.utcn.sd.mca.SD2019StackOverflowApp.persistence.SpecificationFactory;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerManagementService {
    private final RepositoryFactory repositoryFactory;
    private final SpecificationFactory specificationFactory;

    @Transactional
    public AnswerInfo addAnswer(Integer questionId, Integer sOUserId, String text) throws InvalidQuestionIdException, InvalidSOUserIdException {
        Specification<Question> sq = specificationFactory.createFindQuestionById(questionId);
        List<Question> lq = repositoryFactory.createQuestionRepository().query(sq);
        if (lq.isEmpty())
            throw new InvalidQuestionIdException();

        Specification<SOUser> su = specificationFactory.createFindSOUserById(sOUserId);
        List<SOUser> lu = repositoryFactory.createSOUserRepository().query(su);
        if (lu.isEmpty())
            throw new InvalidSOUserIdException();

        LocalDateTime creationDateTime = LocalDateTime.now();

        Answer a = repositoryFactory.createAnswerRepository().save(new Answer(null, questionId, sOUserId, text, creationDateTime));

        return new AnswerInfo(a, lu.get(0).getUsername(), 0);
    }

    @Transactional
    public Optional<AnswerVote> voteAnswer(Integer sOUserId, Integer answerId, VoteType voteType) throws InvalidSOUserIdException,
            InvalidAnswerIdException {
        Specification<SOUser> su = specificationFactory.createFindSOUserById(sOUserId);
        List<SOUser> lu = repositoryFactory.createSOUserRepository().query(su);
        if (lu.isEmpty())
            throw new InvalidSOUserIdException();

        Specification<Answer> sa = specificationFactory.createFindAnswerById(answerId);
        List<Answer> la = repositoryFactory.createAnswerRepository().query(sa);
        if (la.isEmpty())
            throw new InvalidAnswerIdException();

        if (sOUserId.equals(la.get(0).getSOUserId()))
            return Optional.empty();

        Specification<AnswerVote> sav = specificationFactory.createFindSOUserAnswerVote(sOUserId, answerId);
        List<AnswerVote> lav = repositoryFactory.createAnswerVoteRepository().query(sav);
        if (lav.isEmpty()) {
            return Optional.of(repositoryFactory.createAnswerVoteRepository().save(new AnswerVote(null, sOUserId, answerId,
                    voteType.getDatabaseText())));
        } else {
            String answerVote = lav.get(0).getVoteType();
            if (answerVote.equals(voteType.getDatabaseText())) {
                return Optional.empty();
            } else {
                AnswerVote av = repositoryFactory.createAnswerVoteRepository().save(new AnswerVote(lav.get(0).getId(), sOUserId, answerId,
                        voteType.getDatabaseText()));
                AnswerVote x2 = new AnswerVote(av.getId(), av.getSOUserId(), av.getAnswerId(), av.getVoteType() + "x2");
                return Optional.of(x2);
            }
        }
    }

    @Transactional
    public List<AnswerInfo> getQuestionAnswers(Integer questionId) throws InvalidQuestionIdException, InvalidSOUserIdException {
        List<AnswerInfo> ail = new ArrayList<>();

        Specification<Question> sq = specificationFactory.createFindQuestionById(questionId);
        List<Question> lq = repositoryFactory.createQuestionRepository().query(sq);
        if (lq.isEmpty())
            throw new InvalidQuestionIdException();

        Specification<Answer> sa = specificationFactory.createFindAnswerByQuestionId(questionId);
        List<Answer> la = repositoryFactory.createAnswerRepository().query(sa);

        Specification<AnswerVote> sav;
        Specification<SOUser> su;
        for (Answer a : la) {
            su = specificationFactory.createFindSOUserById(a.getSOUserId());
            List<SOUser> lUser = repositoryFactory.createSOUserRepository().query(su);
            if (lUser.isEmpty())
                throw new InvalidSOUserIdException();

            sav = specificationFactory.createFindAnswerVotes(a.getId(), VoteType.UPVOTE);
            List<AnswerVote> lu = repositoryFactory.createAnswerVoteRepository().query(sav);

            sav = specificationFactory.createFindAnswerVotes(a.getId(), VoteType.DOWNVOTE);
            List<AnswerVote> ld = repositoryFactory.createAnswerVoteRepository().query(sav);

            Integer votes = lu.size() - ld.size();

            ail.add(new AnswerInfo(a, lUser.get(0).getUsername(), votes));
        }

        ail.sort((ai1, ai2) -> ai2.getVotes() - ai1.getVotes());

        return ail;
    }

    @Transactional
    public Optional<AnswerInfo> editAnswer(Integer sOUserId, Integer answerId, String newAnswerText) throws InvalidSOUserIdException,
            InvalidAnswerIdException {
        Specification<SOUser> su = specificationFactory.createFindSOUserById(sOUserId);
        List<SOUser> lu = repositoryFactory.createSOUserRepository().query(su);
        if (lu.isEmpty())
            throw new InvalidSOUserIdException();

        Specification<Answer> sa = specificationFactory.createFindAnswerById(answerId);
        List<Answer> la = repositoryFactory.createAnswerRepository().query(sa);
        if (la.isEmpty())
            throw new InvalidAnswerIdException();

        if (!sOUserId.equals(la.get(0).getSOUserId())) {
            return Optional.empty();
        } else {
            Answer a = new Answer(la.get(0).getId(), la.get(0).getQuestionId(), la.get(0).getSOUserId(), newAnswerText, la.get(0).getCreationDateTime());

            repositoryFactory.createAnswerRepository().save(a);

            Specification<AnswerVote> sav = specificationFactory.createFindAnswerVotes(a.getId(), VoteType.UPVOTE);
            List<AnswerVote> lup = repositoryFactory.createAnswerVoteRepository().query(sav);

            sav = specificationFactory.createFindAnswerVotes(a.getId(), VoteType.DOWNVOTE);
            List<AnswerVote> ldown = repositoryFactory.createAnswerVoteRepository().query(sav);

            Integer votes = lup.size() - ldown.size();

            return Optional.of(new AnswerInfo(a, lu.get(0).getUsername(), votes));
        }
    }

    @Transactional
    public boolean deleteAnswer(Integer sOUserId, Integer answerId) throws InvalidSOUserIdException, InvalidAnswerIdException {
        Specification<SOUser> su = specificationFactory.createFindSOUserById(sOUserId);
        List<SOUser> lu = repositoryFactory.createSOUserRepository().query(su);
        if (lu.isEmpty())
            throw new InvalidSOUserIdException();

        Specification<Answer> sa = specificationFactory.createFindAnswerById(answerId);
        List<Answer> la = repositoryFactory.createAnswerRepository().query(sa);
        if (la.isEmpty())
            throw new InvalidAnswerIdException();

        if (!sOUserId.equals(la.get(0).getSOUserId())) {
            return false;
        } else {
            repositoryFactory.createAnswerRepository().remove(la.get(0));
            return true;
        }
    }
}
