package ro.utcn.sd.mca.SD2019StackOverflowApp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.SOUser;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SOUserDTO {
    private Integer id;
    private String username;
    private String password;

    public static SOUserDTO ofEntity(SOUser sOUser) {
        SOUserDTO sOUserDTO = new SOUserDTO();
        sOUserDTO.setId(sOUser.getId());
        sOUserDTO.setUsername(sOUser.getUsername());
        sOUserDTO.setPassword(sOUser.getPassword());
        return sOUserDTO;
    }
}
