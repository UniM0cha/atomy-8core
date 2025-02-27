package me.solstice.atomy_8core_api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "인증 요청 DTO")
public class AuthRequest {
    @Schema(description = "사용자 이름", example = "user")
    private String username;
    
    @Schema(description = "비밀번호", example = "password")
    private String password;
}