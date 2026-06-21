package resume.example.demo.service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import resume.example.demo.dto.LoginRequest;
import resume.example.demo.dto.LoginResponse;
import resume.example.demo.dto.RegisterRequest;
import resume.example.demo.entity.User;
import resume.example.demo.repository.UserRepository;
import resume.example.demo.security.JwtService;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String register(RegisterRequest request) {
        System.out.println("Register API called");

        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        userRepository.save(user);

        return "User Registered Successfully";
    }
    public LoginResponse login(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElse(null);

    if(user == null) {
        return new LoginResponse("User not found");
    }

    if(passwordEncoder.matches(request.getPassword(), user.getPassword())) {

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(token);
    }

    return new LoginResponse("Invalid Password");
}
}