<p align="center">
  <a href="" rel="noopener">
 <img src="https://i.imgur.com/AZ2iWek.png" alt="Project logo"></a>
</p>
<h3 align="center">server</h3>

<div align="center">

[![Hackathon](https://img.shields.io/badge/hackathon-name-orange.svg)](https://hacknitr.tech/)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
<!-- [![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md) -->

</div>

---

<p align="center">Our Project focuses on helping people and patients who are suffering from any disease to contact the nearby doctors and get help on call or chat with them regarding there issue, doctors can prescribe medicine and provide them with help as per thier requirement
    <br> 
</p>

## 📝 Table of Contents

- [Problem Statement](#problem_statement)
- [Idea / Solution](#idea)
- [Dependencies / Limitations](#limitations)
- [Future Scope](#future_scope)
- [Setting up a local environment](#getting_started)
- [Usage](#usage)
- [Technology Stack](#tech_stack)
- [Authors](#authors)

## 🧐 Problem Statement <a name = "problem_statement"></a>

We focus on dealing with problems faced by people in there day to day life regarding there health and how at times our busy schedule makes us ignore our health, Patients who are ill, suffering from any mental disorder, people who need a therapist or someone consultant can use our app and see the change in thier life.

People who are unable to find doctor who can help them, patients who lack the confidence to face the truth, or even in times when you need a second opinion you can connect to your own personal doctor and discuss with them. Doctors who are available near you can provide you with medicine, opinion and help that you were looking for.

## 💡 Idea / Solution <a name = "idea"></a>

Our app can provide doctors who are available to help the patient with thier needs, They can chat with each other or do a video call and can examine the patient and prescribe him with medicine, opinion in terms of surgery and so. 

## ⛓️ Dependencies / Limitations <a name = "limitations"></a>

- One of the biggest problems is starting the peerjs connection again and again when ever video chat option is choosen 
- Availability of doctors is determined by doctor himself, reaching out to doctors near the patient is a tedious task. 


## 🚀 Future Scope <a name = "future_scope"></a>

We'll be making a fully managable app where we can have doctors interacting with multiple patients, consultants and therapists available for each patient, patients can choose multiple doctors for advise in various fields and a better design implementation

## 🏁 Getting Started <a name = "getting_started"></a>

- Run the server and open localhost:3000 on the browser using the following command:
  ```
  $ npm start
  ```
- For video streaming support use:
  ```
  $ peerjs --port 3001
  ```

### Prerequisites

We'll be using the following node_modules:
  * "axios": "^0.24.0",
  * "cookie-parser": "^1.4.5",
  * "cors": "^2.8.5",
  * "ejs": "^3.1.6",
  * "express": "^4.17.1",
  * "http": "0.0.1-security",
  * "mongoose": "^6.0.12",
  * "nodemon": "^2.0.14",
  * "socket.io": "^4.3.1",
  * "uuid": "^8.3.2"


### Installing

For using this project we need to install nodejs and use the following code: 
```
git clone <repo link>
npm install
```

## 🎈 Usage <a name="usage"></a>

We have provided the routes as follows: 
  * Patients Login - /
  * Patients Signup - /signup
  * Doctor Login - /doc
  * Doctor Signup - /docsignup
  * Chat - /chat
  * Video - /video
  * Home - /home
  * Doctor's List of patients - /docWait

Once logged in after the signup patient can check out the list of doctors and can interact with them via chat or video.
## ⛏️ Built With <a name = "tech_stack"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Ejs](https://ejs.co/) - Frontend Environment

## ✍️ Authors <a name = "authors"></a>

- [@shinjondas](https://github.com/shinjondas)
- [@SSaxena2001](https://github.com/SSaxena2001)
- [@akshatvid](https://github.com/akshatvid)


