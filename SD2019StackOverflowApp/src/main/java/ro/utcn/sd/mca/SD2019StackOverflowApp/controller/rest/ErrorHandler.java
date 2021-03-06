package ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ro.utcn.sd.mca.SD2019StackOverflowApp.dto.ErrorDTO;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.*;

@Component
@RestControllerAdvice
public class ErrorHandler {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(InvalidSOUserIdException.class)
    public ErrorDTO handleInvalidSOUserIdException(InvalidSOUserIdException e) {
        return new ErrorDTO(e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(InvalidAnswerIdException.class)
    public ErrorDTO handleInvalidAnswerIdException(InvalidAnswerIdException e) {
        return new ErrorDTO(e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(InvalidQuestionIdException.class)
    public ErrorDTO handleInvalidQuestionIdException(InvalidQuestionIdException e) {
        return new ErrorDTO(e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(DuplicateUsernameException.class)
    public ErrorDTO handleDuplicateUsernameException(DuplicateUsernameException e) {
        return new ErrorDTO(e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(CanEditOnlyOwnAnswersException.class)
    public ErrorDTO handleCanEditOnlyOwnAnswersException(CanEditOnlyOwnAnswersException e) {
        return new ErrorDTO(e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(CanDeleteOnlyOwnAnswersException.class)
    public ErrorDTO handleCanDeleteOnlyOwnAnswersException(CanDeleteOnlyOwnAnswersException e) {
        return new ErrorDTO(e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(CannotVoteOwnQuestionsOrTwiceException.class)
    public ErrorDTO handleCannotVoteOwnQuestionsOrTwiceException(CannotVoteOwnQuestionsOrTwiceException e) {
        return new ErrorDTO(e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(CannotVoteOwnAnswersOrTwiceException.class)
    public ErrorDTO handleCannotVoteOwnAnswersOrTwiceException(CannotVoteOwnAnswersOrTwiceException e) {
        return new ErrorDTO(e.getMessage());
    }
}
