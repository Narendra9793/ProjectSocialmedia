# FROM eclipse-temurin:21
# VOLUME /tmp
# COPY target/ProjectSocialmedia.jar ProjectSocialmedia.jar
# EXPOSE 8080
# ENTRYPOINT ["java", "-jar", "ProjectSocialmedia.jar"]

FROM eclipse-temurin:21
RUN mkdir /opt/app
COPY /target/ProjectSocialmedia.jar /opt/app
CMD ["java", "-jar", "/opt/app/ProjectSocialmedia.jar"]
