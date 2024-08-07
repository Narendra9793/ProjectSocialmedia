FROM maven:3.9.5-openjdk-21 AS build

COPY . .

FROM openjdk:21-jdk
COPY --from=build /target/ProjectSocialmedia.jar ProjectSocialmedia.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "ProjectSocialmedia.jar"]