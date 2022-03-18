FROM library/ubuntu:20.04 as UBUNTU_BASE
MAINTAINER alessandri.luca1991@gmail.com
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get -y install build-essential wget apt-transport-https ca-certificates curl git lsb-release nodejs npm ufw
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
RUN echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
RUN apt-get update && apt-get install -y docker-ce docker-ce-cli containerd.io
RUN newgrp docker
COPY ripuliscimi.sh /home/ripuliscimi.sh
EXPOSE 3000
ENV SHELL=/bin/bash
RUN cd /home && git clone https://github.com/alessandriLuca/dockerFileGenerator
COPY nodejs /nodejs/
CMD ["node","/nodejs/gui.js"]
