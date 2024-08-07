FROM maven:3.2.0-openjdk-21 AS build

COPY . .

FROM openjdk:21.0.1-jdk-slim
COPY --from=build /target/ProjectSocialmedia.jar ProjectSocialmedia.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "ProjectSocialmedia.jar"]