# FROM eclipse-temurin:21-jdk-alpine
# VOLUME /tmp
# COPY target/ProjectSocialmedia.jar ProjectSocialmedia.jar
# ENTRYPOINT [ "java", "-jar", "/ProjectSocialmedia.jar"]
# EXPOSE 8080

FROM openjdk:21-jdk-slim
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8080
EXPOSE 8081