FROM eclipse-temurin:21-jdk-alpine
VOLUME /tmp
COPY target/*.jar ProjectSocialmedia.jar
ENTRYPOINT [ "java", "-jar", "/ProjectSocialmedia.jar"]
EXPOSE 8080