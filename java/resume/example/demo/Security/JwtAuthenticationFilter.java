package resume.example.demo.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {



                System.out.println("JWT Filter Executed");

        System.out.println("==== ALL HEADERS ====");

java.util.Enumeration<String> headerNames = request.getHeaderNames();

while(headerNames.hasMoreElements()) {
    String headerName = headerNames.nextElement();
    System.out.println(headerName + " = " + request.getHeader(headerName));
}


String authHeader = request.getHeader("Authorization");
System.out.println("Authorization Header: " + authHeader);
        System.out.println("JWT Filter Executed");


System.out.println("Authorization Header: " + authHeader);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);

            try {
                String email = jwtService.extractEmail(token);

                System.out.println("Valid Token for: " + email);

            } catch (Exception e) {

                System.out.println("Invalid Token");
            }
        }

        filterChain.doFilter(request, response);
    }
}