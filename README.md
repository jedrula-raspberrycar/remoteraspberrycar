docker build -t jedrula-remoteraspberrycar .
docker tag jedrula-remoteraspberrycar jedrula/jedrula-remoteraspberrycar
docker push jedrula/jedrula-remoteraspberrycar


#Project for remote controlling a raspberry pi car.
### Brains of the Pi: nodejs
### Web client: Ember app.

![Built car](https://github.com/jedrula-raspberrycar/remoteraspberrycar/blob/master/built%20car.jpg "built car")

![Web interface](https://github.com/jedrula-raspberrycar/remoteraspberrycar/blob/master/web%20interface.jpg "web interface")

what you need:

1. raspberry pi
2. a [3 wheel car](https://github.com/jedrula/remoteraspberrycar/blob/master/car_image.jpg) ( two engines run from some sort of battery)
3. power bank for raspberry
4. [l298n](https://github.com/jedrula/remoteraspberrycar/blob/master/l298n.jpg) motor control board

to setup and start the app on raspberry pi:

1. connect raspberry to the charger and to the ethernet cable (or to wlan - best just connect keyboard and external monitor and choose your wifi name and type password)
2. read ip address of raspberry from your router admin paner, sth like: http://192.168.0.1/dhcp.htm
3. ssh pi@192.168.0.1 or pi@192.168.0.150 or something along those lines(password raspberry)
4. install nodejs and npm #TODO provide a link
5. ssh into raspberry pi
6. download project from repo https://github.com/jedrula/remoteraspberrycar.git to remoteraspberrycar folder (TODO provide better instructions on how to get the app to the pi)
7. cd remoteraspberrycar
8. npm install
9. npm start (TODO provide more information on how to start the program as a service on the pi)


to setup and start the web client

1. clone the repo and enter its directory

2. cd frontend/ember_cli

3. start ember app

  ember serve --environment production (TODO this probably won't work as you need to modify the dynamically set host api of your pi)

4. for frontend development with mirage

  ember serve --environment development


Troubleshooting:

  express gets requests but engine does not respond to command - maybe you are not running node app with sudo

  to restart raspberry you can try this from ssh:
  `sudo shutdown -r now`

  fixing-wifi-dropout-issues

  `sudo iw dev wlan0 set power_save off`
    [see here for more details](http://qdosmsq.dunbar-it.co.uk/blog/2016/03/does-your-raspberry-pi-3-lose-wifi-connections-after-a-while/)



NOTES

I have been experimenting with speed, benchmarking websockets, tunneling using resin.io and connection straight to my modem

1. websockets is usually a bit faster then fetch but not always
2. straight modem connection is much faster then resins
3. there might be room for improvement as right now there is an additional hoop - reverse proxy on NAS (issue with forwarding port 80 so i do 7002->nas->80 on pi)
4. might be a good idea to let the user choose the transport type and report with the results
5. right now the lowest we can get is about 70ms with ws and 80ms with fetch, both transports rarely go above 300ms mark for a roundtrip
