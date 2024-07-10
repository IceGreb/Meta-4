package com.nikoverg.DB.backend.config;

import com.nikoverg.DB.backend.filters.JwtRequestFilter;
import com.nikoverg.DB.backend.services.MongoAuthUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private final MongoAuthUserDetailService userDetailsService;
    @Autowired
    private final JwtRequestFilter jwtRequestFilter;

    public SecurityConfig(MongoAuthUserDetailService userDetailsService, JwtRequestFilter jwtRequestFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/api/v1/login").permitAll()
                        .requestMatchers("/api/v1/create/{collection}", "/api/v1/update/{uniParcId}",  "api/v1/delete/{uniParcId}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/delete/**").hasRole("ADMIN")
                        .requestMatchers("/api/v1/proteins/{uniParcId}", "/api/v1/allCollections", "/api/v1/{collection}/all", "/api/v1/count/{collection}", "/api/v1/search").permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }
}
