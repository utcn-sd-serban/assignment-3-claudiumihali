package ro.utcn.sd.mca.SD2019StackOverflowApp.controller.rest.command;

import org.springframework.stereotype.Component;

@Component
public class Invoker {
    // here we shall put a list of commands for supporting undo/redo
    public Object invoke(Command command) throws Exception {
        return command.execute();
    }
}
