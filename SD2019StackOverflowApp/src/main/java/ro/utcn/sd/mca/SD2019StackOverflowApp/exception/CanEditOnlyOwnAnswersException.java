package ro.utcn.sd.mca.SD2019StackOverflowApp.exception;

public class CanEditOnlyOwnAnswersException extends Exception {
    @Override
    public String getMessage() {
        return "You can edit only your own answers!";
    }
}
