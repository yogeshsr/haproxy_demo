FROM ubuntu:16.04

RUN apt update && apt-get -y install net-tools && apt-get -y install iputils-ping && apt-get -y install wget

RUN echo "Load test container"

RUN wget https://github.com/tsenart/vegeta/releases/download/cli%2Fv12.1.0/vegeta-12.1.0-linux-amd64.tar.gz \
&& tar -xzf vegeta-12.1.0-linux-amd64.tar.gz

ENTRYPOINT /bin/bash
