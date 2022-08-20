package com.price.finder.backend.config.filters;

import com.price.finder.backend.jwt.JwtTokenUtil;
import com.price.finder.backend.models.User;
import com.price.finder.backend.services.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {
    private final JwtTokenUtil jwtTokenUtil;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        final String requestTokenHeader = request.getHeader("Authorization");

        String email = null;
        String jwtToken = null;
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                email = jwtTokenUtil.getUsernameFromToken(jwtToken);
            } catch (IllegalArgumentException e) {
                System.out.println("Unable to get JWT Token");
            } catch (ExpiredJwtException e) {
                System.out.println("JWT Token has expired");
            }
        } else {
            logger.warn("JWT Token does not begin with Bearer String");
        }

        if (email != null) {
            User dbUser = userService.findUserByEmail(email);

            if (dbUser == null) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            } else {
                if (!jwtTokenUtil.validateToken(jwtToken, dbUser)) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                } else {
                    chain.doFilter(request, response);
                }
            }
        }
    }
}
