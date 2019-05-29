package ro.utcn.sd.mca.SD2019StackOverflowApp.exception;

public class CanDeleteOnlyOwnAnswersException extends Exception {
    @Override
    public String getMessage() {
        return "You can delete only your own answers!";
    }
}
