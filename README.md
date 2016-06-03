Project for remote controlling a raspberry pi car

what you need:

1. raspberry pi
2. wifi dongle
3. a 3 wheel ( two engines run from some sort of battery) car, see: https://github.com/jedrula/remoteraspberrycar/blob/master/car_image.jpg 
4. power bank for raspberry

setup:

1. setup wifi dongle: https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md
2. install nodejs and npm #TODO provide a link
3. install git #TODO provide a link
4. git clone https://github.com/jedrula/remoteraspberrycar.git
5. cd remoteraspberrycar
6. npm install
7. npm start
8. ifconfig - read ip of your raspberry
9. use an app/browser to send commands to the app, example request to make the car do sth would be sth like 192.168.0.135:3000/forward #TODO WIP

to start the app on raspberry pi:

1. connect raspberry to the carger and to the ethernet cable
2. read ip address of raspberry from your router admin paner, sth like: http://192.168.0.1/dhcp.htm
3. ssh pi@192.168.0.1 (password raspberry)
4. cd jedrek/myapp
5. npm start

to have the node.js program start on raspberry boot:

1. check where your node is by running 'which node', you should get sth like '/usr/local/bin/node'
2. open crontab using sudo crontab -e
3. add this line:
  @reboot sudo /usr/local/bin/node path/to/the/repo/ended/with/bin/www &

all done, you can use nodemon instead of node to watch files and auto restart node app. It would also be nice to have the output in a file rather then in the void. However we should have some file size limit not to overload the Pi.

