package me.solstice.atomy_8core_api.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    // 임시 사용자 저장소 - 실제 구현에서는 데이터베이스에서 조회
    private final Map<String, UserDetails> users = new HashMap<>();
    
    public UserDetailsServiceImpl(PasswordEncoder passwordEncoder) {
        // 테스트용 사용자 추가
        users.put("user", User.builder()
                .username("user")
                .password(passwordEncoder.encode("password"))
                .authorities("ROLE_USER")
                .build());
        
        users.put("admin", User.builder()
                .username("admin")
                .password(passwordEncoder.encode("admin"))
                .authorities("ROLE_ADMIN")
                .build());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (!users.containsKey(username)) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        return users.get(username);
    }
}