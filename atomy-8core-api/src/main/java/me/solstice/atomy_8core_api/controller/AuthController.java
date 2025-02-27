package me.solstice.atomy_8core_api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import me.solstice.atomy_8core_api.config.JwtConfig;
import me.solstice.atomy_8core_api.dto.AuthRequest;
import me.solstice.atomy_8core_api.dto.AuthResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "인증 관련 API")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtConfig jwtConfig;

    @Operation(summary = "로그인", description = "사용자 이름과 비밀번호로 로그인하여 JWT 토큰을 발급받습니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "로그인 성공", 
            content = @Content(schema = @Schema(implementation = AuthResponse.class))),
        @ApiResponse(responseCode = "401", description = "인증 실패")
    })
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        // AuthenticationManager를 통한 인증
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
            )
        );
        
        // 인증이 성공하면 UserDetails 조회
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        
        // JWT 토큰 생성
        String accessToken = jwtConfig.generateToken(userDetails);
        String refreshToken = jwtConfig.generateRefreshToken(userDetails);
        
        return ResponseEntity.ok(
            AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build()
        );
    }
}