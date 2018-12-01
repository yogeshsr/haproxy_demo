
This is used to demonstarte how tune Haproxy config to handle differnt traffic loads.


Create networks. nw2 is used by proxy to use another source ip to double numof HA to server conn
```
docker network create nw1
#docker network create nw2
docker network create --subnet=192.168.0.0/16 nw2
```

Start apps first so as ip 192.168.0.2 is allocated to app1 then start HA. HA will get 192.168.0.3
```
cd haproxy_demo

docker-compose up --build
```

Open another shell
```
cd haproxy_demo
docker-compose -f docker-compose-ha.yml up --build

# haproxydemo_proxy container. Not needed
export proxy_container_id=59e5a5373a7a
docker network disconnect nw2 $proxy_container_id
docker network connect --alias proxy_2 nw2 $proxy_container_id

```

Open another shell.
Login to the load_test container and make request to the HA.
Watch the HA logs don't have 503 reponse.
```
container_id=`docker ps | grep haproxy_demo_load_test | awk '{print $1}'`
docker exec -it $container_id /bin/bash

echo "GET http://proxy:80/slow" | ./vegeta attack -duration=20s -rate=100 | ./vegeta report
```

To build with another ha-config. This might not work with the current HA base image.
```
docker-compose build --build-arg haconfig=haproxy_1.cfg
```
