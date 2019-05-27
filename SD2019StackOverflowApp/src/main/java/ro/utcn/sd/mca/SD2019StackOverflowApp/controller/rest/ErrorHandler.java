package ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ro.utcn.sd.mca.SD2019StackOverflowApp.dto.ErrorDTO;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.DuplicateUsernameException;
import ro.utcn.sd.mca.SD2019StackOverflowApp.exception.InvalidSOUserIdException;

@Component
@RestControllerAdvice
public class ErrorHandler {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(InvalidSOUserIdException.class)
    public ErrorDTO handleInvalidSOUserIdException(InvalidSOUserIdException e) {
        return new ErrorDTO(e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(DuplicateUsernameException.class)
    public ErrorDTO handleDuplicateUsernameException(DuplicateUsernameException e) {
        return new ErrorDTO(e.getMessage());
    }
}
