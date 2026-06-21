package resume.example.demo.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import resume.example.demo.dto.LoginRequest;
import resume.example.demo.dto.LoginResponse;
import resume.example.demo.dto.RegisterRequest;
import resume.example.demo.service.UserService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request){
        return userService.register(request);
    }

    @PostMapping("/login")
public LoginResponse login(@RequestBody LoginRequest request){
    return userService.login(request);
}
}