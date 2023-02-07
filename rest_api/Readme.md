# Rest api, Front end app and registraton form servers

This folder contains the REST API for the panda pay application. Middleware has been set up to facilitate the payment functions from the front end
to the smart contract. 

### Running the apps

1. Ensure the folder is downloaded locally onto your device.

2. open the rest_api folder and front-end application in seperate terminals

3. install dependencies in both terminals by typing : 

```bash
npm install
```

4. moving to the rasberry pi, start up the device and open its terminal.

5. change directory into the door folder and execute the command :

6. next, change the ip addresses of the rpi_ip_address my_ip_addresss

```bash
nohup node main.js &
```

7. after that, start the react app by :

```bash
npm start
```

8. and the rest_api server as well by :

```bash
npm server.js
```

9. ensure all the servers running are hosted on the same network 

10. finally, conduct the features of the application as shown in the video file.