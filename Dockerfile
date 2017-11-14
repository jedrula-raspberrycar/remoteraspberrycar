# base-image for node on any machine using a template variable,
# see more about dockerfile templates here: http://docs.resin.io/deployment/docker-templates/
# and about resin base images here: http://docs.resin.io/runtime/resin-base-images/
# Note the node:slim image doesn't have node-gyp
FROM arm32v7/node:8.9.1-stretch

# TODO fold RUN cmds to one cmd

# RUN curl http://www.linux-projects.org/listing/uv4l_repo/lpkey.asc | apt-key add -
# RUN curl http://www.linux-projects.org/listing/uv4l_repo/lrkey.asc | apt-key add -

# RUN echo "deb http://www.linux-projects.org/listing/uv4l_repo/raspbian/stretch stretch main" | tee -a /etc/apt/sources.list

RUN apt-get update

RUN apt-get -y dist-upgrade

# RUN apt-get install uv4l uv4l-raspicam

# RUN apt-get install uv4l-raspicam-extras

# RUN apt-get install uv4l-server

# RUN apt-get install uv4l-uvc

# RUN apt-get install uv4l-xscreen

# RUN apt-get install uv4l-mjpegstream

# RUN apt-get install uv4l-webrtc-armv6

# this for rpi2 or 3 (https://www.linux-projects.org/uv4l/installation/)
# RUN apt-get install uv4l-webrtc


# RUN apt-get install -yq libraspberrypi-bin

RUN apt-get install pigpio

# Defines our working directory in container
WORKDIR /usr/src/app

# Copies the package.json first for better cache on later pushes
COPY package.json package.json

# This install npm dependencies on the resin.io build server,
# making sure to clean up the artifacts it creates in order to reduce the image size.
RUN npm install --production

# This will copy all files in our root to the working  directory in the container
COPY . ./

# Enable systemd init system in container
ENV INITSYSTEM on

# server.js will run when container starts up on the device
CMD ["npm", "start"]

# sudo uv4l --auto-video_nr --driver raspicam --encoding mjpeg --width 640 --height 480 --framerate 20 --server-option '--port=3080'
