package ro.utcn.sd.mca.SD2019StackOverflowApp.exception;

public class CannotVoteOwnAnswersOrTwiceException extends Exception {
    @Override
    public String getMessage() {
        return "You cannot vote your own answers or twice!";
    }
}
