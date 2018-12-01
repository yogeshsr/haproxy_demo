FROM rafpe/docker-haproxy-rsyslog
# https://github.com/RafPe/docker-haproxy-rsyslog

# Send a PR to rafpe to support this arg if needed
ARG haconfig=haproxy.cfg

RUN apt update && apt-get -y install net-tools && apt-get -y install iputils-ping

RUN echo $haconfig

COPY ${haconfig} /usr/local/etc/haproxy/haproxy.cfg
