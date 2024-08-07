# Use an official OpenJDK runtime as a parent image
FROM eclipse-temurin:21-jre

# Set the working directory in the container
WORKDIR /app

# Copy the packaged jar file into the container
COPY target/ProjectSocialmedia.jar /app/ProjectSocialmedia.jar

# Command to run the application
ENTRYPOINT ["java", "-jar", "/app/ProjectSocialmedia.jar"]
