# docker-kubernetes
This project includes a Docker setup to streamline development, testing, and deployment processes. Docker allows for consistent environments and easy scalability, making it simpler to manage dependencies and configurations.

#Steps of Kubernates application deployment

1. Create a node js application 
2. Build your image 
3. Push the image to dockerhub
4. Create a docker file
5. Create a kubernates deployment



#docker commonds

1. docker build -t imagename . 
2. docker image tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
3. docker images
4. docker run -d -p 4000:4000 imagename  #tag port no and run the container
5. docker ps
6. docker rm -f imageId  #dalete the container 
7. docker login
8. docker push imagename:tagname

#kubernates deployments

1. minikube status
2. minikube start
3. kubectl get pods
4. kubectl get deployments
5. kubectl get svc
6. kubectl apply -f k8s/user.yaml
7. kubectl get deployment
8. kubectl get pods
9. kubectl logs  pod name
10. kubectl get svc
11. minikube service service-name
12. minikube delete
