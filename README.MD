Shega
Description
This project is named Shega and is designed for Full stack Software Engineer
Role Assignment.

Getting Started
These instructions will help you set up and run the project on your local machine.

Prerequisites
Make sure you have the following software installed on your machine:

Node.js - JavaScript runtime
npm - Node.js package manager
mysql - database
Installing Dependencies
To install project dependencies, run the following command in the project root:

bash
Copy code
npm install
This command uses concurrently to install server and frontend dependencies concurrently.

Running the Application
To start both the server and frontend concurrently, run:

bash
Copy code
npm start
This command uses concurrently to run the server and frontend applications in parallel.

Server: backend
Frontend: frontend
Server-only Development
If you want to start only the server, you can run:

bash
Copy code
npm run start-server
This command uses ts-node to run the server.

Frontend-only Development
If you want to start only the frontend, you can run:

bash
Copy code
npm run start-front
This command assumes there is a "start" script in your frontend's package.json.

Author
yeshewas gatawbza

License
This project is licensed under the ISC License - see the LICENSE.md file for details.
