# EscapeAI
# Welcome to EscapeAI, an interactive escape room game powered by AI-generated puzzles! <br/> This project combines the thrill of solving puzzles with the power of artificial intelligence to create a unique gaming experience.

## Technologies Used
**Frontend:** React, Material-UI
<br/>
**Backend:** Python (Flask), LangChain-OpenAI API, MongoDB
<br/>
## Overview
EscapeAI is a React-based web application that simulates an escape room adventure. <br/>
Players navigate through various stages generated by OpenAI's language model. <br/>
The game dynamically adjusts difficulty based on player input, offering a challenging yet rewarding experience.<br/>

## Features
**User Interaction:** Engage with intuitive UI elements and responsive design.<br/>
**Customizable Experience**: Tailor game difficulty and preferences at the start.<br/>

## Installation
To run EscapeAI locally, follow these steps:

### Clone the repository:
~~~
git clone https://github.com/brachaer/EscapeAI.git
~~~
### Install dependencies for both the client and server:

### Install client dependencies (React app)
~~~
cd escape-ai
npm install
~~~
# Install server dependencies (if applicable)
~~~
cd escape-ai-server
pip install -r requirements.txt
Set up environment variables:
~~~
Create a .env file in the server directory and add environment variables (OPENAI_API_KEY, MONGO_URI).

## Start the application:
### Start the React client (from the escape-ai directory)
~~~
npm run dev
~~~
### Start the server (if applicable, from the server directory)
~~~
python run.py
~~~
Open your browser and navigate to http://localhost:3000 to view the application.

## Usage
**Game Setup:** Choose your game settings, including difficulty and number of stages.<br/>
**Navigate Stages:** Progress through each stage by solving puzzles and challenges.<br/>
**Interact:** Use intuitive controls to interact with the game environment and solve puzzles.<br/>
**Complete the Escape:** Reach the final stage to complete the escape and celebrate your victory!<br/>

## Real-Time Communication
EscapeAI uses Socket.IO to facilitate real-time communication between the client and server.<br/> 
This allows for instant updates and interactions within the game.<br/>

### Key features include:

**Dynamic Updates:** Get live updates on game progress and other interactions.<br/>
**Seamless Interaction:** Engage with game elements and receive feedback in real time, enhancing the overall experience.<br/>
## How It Works:
**Server-Side:** The server uses Flask-SocketIO to handle real-time communication.<br/> It listens for events and messages from clients, processes them, and sends responses accordingly.<br/>
**Client-Side:** The React client connects to the server using the Socket.IO client library.<br/> It sends and receives events to update the game state and interface in real time.<br/>

