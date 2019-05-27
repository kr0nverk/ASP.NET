Задание по предмету ASP.NET

1. Asp.net core (2.0) - API (REST)
	-GET/POST/PUT/DELETE
	-3 Объекта (2 объекта)
	-Swagger API
2. Web UI (не доделано под Contacts)
3. Docker
	-docker file
	-docker-compose (не реализовано)

Для запуска на докере использовался docker toolbox on Windows.
В командной строке докера переходим в папку проекта запускаем команды:

docker build -t aspnetapp .
docker run -p 8080:80 —name myapp aspnetapp

В другой командной строке убеждаемся, что приложение работает:

docker ps

В браузере переходим на дефолтный айпи докера тоолбокс, у меня это:

http://192.168.99.100:8080/

Для завершения всех образов докера:

docker stop $(docker ps -q)
