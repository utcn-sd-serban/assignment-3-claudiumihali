package ro.utcn.sd.mca.SD2019StackOverflowApp.exception;

public class InvalidQuestionIdException extends Exception {
    @Override
    public String getMessage() {
        return "Invalid questionId!";
    }
}
