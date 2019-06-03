package ro.utcn.sd.mca.SD2019StackOverflowApp.exception;

public class DuplicateUsernameException extends Exception {
    @Override
    public String getMessage() {
        return "Duplicate username!";
    }
}
