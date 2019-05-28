package ro.utcn.sd.mca.SD2019StackOverflowApp.dto;

import lombok.Data;

@Data
public class BooleanDTO {
    private boolean value;

    public static BooleanDTO ofEntity(boolean value) {
        BooleanDTO booleanDTO = new BooleanDTO();
        booleanDTO.setValue(value);
        return booleanDTO;
    }
}
