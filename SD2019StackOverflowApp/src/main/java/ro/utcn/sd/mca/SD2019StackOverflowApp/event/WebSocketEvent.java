package ro.utcn.sd.mca.SD2019StackOverflowApp.event;

import lombok.Data;

@Data
public class WebSocketEvent {
    private final EventType type;
    private final Object dto;
}
