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
* Node js
* Nodemon: 2.0.22
* Bcrypt: 5.1.0
* Cloudinary: 1.40.0
* Jwt: 3.1.2
	
## Setup
To run this project, install it locally using npm:

```
$ cd ..\Ai_image_generator\
$ npm install
$ cd ./Ai_client/vite-project/
$ npm run dev
$ cd ..\Ai_image_generator\Ai_server
$ npm start
```
## Usage
 To create an image enter some text to prompt and push generate image button. 
 Sampler: Which algorithm to use to produce the image

**Steps**: How many times to improve the generated image iteratively; higher values take longer; very low values can produce bad results

**CFG scale schedule**: How closely the image should conform to the prompt. Lower values produce more creative results. (recommended range 5-15)

**Negative prompt**:Allows you to use another prompt of things the model should avoid when generating the picture. This works by using the negative prompt for unconditional conditioning in the sampling process instead of an empty string.
## Images
![Alt text](<screen shots/Ekran görüntüsü 2023-08-23 223828.png>)
![Alt text](<screen shots/Ekran görüntüsü 2023-08-23 223715.png>)
![Alt text](<screen shots/Ekran görüntüsü 2023-08-23 223729.png>)
![Alt text](<screen shots/Ekran görüntüsü 2023-08-23 223754.png>)
![Alt text](<screen shots/Ekran görüntüsü 2023-08-23 223804.png>)
![Alt text](<screen shots/Ekran görüntüsü 2023-08-23 224507.png>)
![Alt text](<screen shots/Ekran görüntüsü 2023-08-23 224540.png>)