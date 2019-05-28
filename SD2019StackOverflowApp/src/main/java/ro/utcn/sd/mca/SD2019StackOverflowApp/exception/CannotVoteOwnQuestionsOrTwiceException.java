package ro.utcn.sd.mca.SD2019StackOverflowApp.exception;

public class CannotVoteOwnQuestionsOrTwiceException extends Exception {
    @Override
    public String getMessage() {
        return "You cannot vote your own questions or twice!";
    }
}
