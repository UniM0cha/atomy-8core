package me.solstice.atomy_8core_api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Test", description = "테스트용 API")
public class TestController {

    @GetMapping("/public/hello")
    @Operation(summary = "인증 없이 접근 가능한 API", description = "누구나 접근 가능한 공개 API입니다.")
    public ResponseEntity<String> publicHello() {
        return ResponseEntity.ok("Hello, Public World!");
    }

    @GetMapping("/secured/hello")
    @Operation(
        summary = "인증이 필요한 API", 
        description = "JWT 토큰이 필요한 보안 API입니다.",
        security = { @SecurityRequirement(name = "bearerAuth") }
    )
    public ResponseEntity<String> securedHello() {
        return ResponseEntity.ok("Hello, Secured World!");
    }
}