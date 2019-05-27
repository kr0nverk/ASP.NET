

docker ps
docker stop $(docker ps -q)

docker build -t aspnetapp .
docker run -p 8080:80 —name myapp aspnetapp

http://192.168.99.100:8080/