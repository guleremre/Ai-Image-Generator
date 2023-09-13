# Project Name:Ai-rtistic
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Usage](#usage)
* [Images from App](#images)
## General info
This is a MERN project about creating image from text by using Artificial Intelligence. 
For AI [Stable diffusion](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#alt-diffusion) is used. 

	
## Technologies
Project is created with:

* React: 18.2.0
* Material Ui
* Sass: 1.64.1
* Dotenv: 16.3.1
* Express: 4.18.2
* Mongoose: 7.4.0
* MongoDb
* Node js
* Nodemon: 2.0.22
* Bcrypt: 5.1.0
* Cloudinary: 1.40.0
* Jwt: 3.1.2
	
## Setup
Configuration: Create a .env file in the root directory (../Ai_image_generator\Ai_server) and set up the following environment variable: 
DB_CONNECT = your DB_CONNECT,
salt= your salt,
saltRounds= your saltRounds,
port= your port,
CLOUD_NAME=yourCLOUD_NAME,
CLOUD_API_SECRET=your-CLOUD_API_SECRET,
CLOUD_API_K=your-CLOUD_API_K

To run this project, install it locally using npm:
```
$ cd ..\Ai_image_generator\
$ npm install
$ cd .\Ai_client/vite-project\
$ npm run dev
$ cd ..\Ai_image_generator\Ai_server
$ npm start
```
## Usage
 To create an image enter some text to prompt and push generate image button. 
 
 **Sampler** : Which algorithm to use to produce the image

**Steps**: How many times to improve the generated image iteratively; higher values take longer; very low values can produce bad results

**CFG scale schedule**: How closely the image should conform to the prompt. Lower values produce more creative results. (recommended range 5-15 )

**Negative prompt**:Allows you to use another prompt of things the model should avoid when generating the picture. This works by using the negative prompt for unconditional conditioning in the sampling process instead of an empty string.

## Images
![Alt text](<screen shots/Ekran görüntüsü 2023-08-23 223828.png>)
![Alt text](<screen shots/Ekran görüntüsü 2023-08-23 223715.png>)
![Alt text](<screen shots/Ekran görüntüsü 2023-08-23 223729.png>)
![Alt text](<screen shots/Ekran görüntüsü 2023-08-23 223754.png>)
![Alt text](<screen shots/Ekran görüntüsü 2023-08-23 223804.png>)
![Alt text](<screen shots/Ekran görüntüsü 2023-08-23 224507.png>)
![Alt text](<screen shots/Ekran görüntüsü 2023-08-23 224540.png>)


<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://getbootstrap.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://sass-lang.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" alt="sass" width="40" height="40"/> </a> </p>