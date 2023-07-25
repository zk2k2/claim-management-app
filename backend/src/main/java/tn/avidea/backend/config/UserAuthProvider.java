package tn.avidea.backend.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import tn.avidea.backend.dto.UserDto;
import tn.avidea.backend.service.UserService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;

@RequiredArgsConstructor
@Component
public class UserAuthProvider {

  private String secretKey = generateRandomSecretKey();

  private final UserService userService;

  @PostConstruct
  protected void init() {
    secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    System.out.println("This is the secret key" + secretKey);
  }

  public String createToken(UserDto user) {
    Date now = new Date();
    Date validity = new Date(now.getTime() + 360000000);

    Algorithm algorithm = Algorithm.HMAC256(secretKey);
    String token = JWT.create()
        .withIssuer(user.getLogin())
        .withIssuedAt(now)
        .withExpiresAt(validity)
        .withClaim("firstName", user.getFirstName())
        .withClaim("lastName", user.getLastName())
        .sign(algorithm);

    System.out.println("This is the token" + token);
    return token;
  }

  public Authentication validateToken(String token) {
    Algorithm algorithm = Algorithm.HMAC256(secretKey);

    JWTVerifier verifier = JWT.require(algorithm)
        .build();

    DecodedJWT decoded = verifier.verify(token);

    UserDto user = UserDto.builder()
        .login(decoded.getIssuer())
        .firstName(decoded.getClaim("firstName").asString())
        .lastName(decoded.getClaim("lastName").asString())
        .build();

    return new UsernamePasswordAuthenticationToken(user, null,
        Collections.emptyList());
  }

  public Authentication validateTokenStrongly(String token) {
    Algorithm algorithm = Algorithm.HMAC256(secretKey);

    JWTVerifier verifier = JWT.require(algorithm)
        .build();

    DecodedJWT decoded = verifier.verify(token);

    UserDto user = userService.findByLogin(decoded.getIssuer());

    return new UsernamePasswordAuthenticationToken(user, null,
        Collections.emptyList());
  }

  private String generateRandomSecretKey() {
    String allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    int keyLength = 32;
    SecureRandom random = new SecureRandom();
    StringBuilder sb = new StringBuilder(keyLength);
    for (int i = 0; i < keyLength; i++) {
      int randomIndex = random.nextInt(allowedChars.length());
      char randomChar = allowedChars.charAt(randomIndex);
      sb.append(randomChar);
    }
    return sb.toString();
  }
}
