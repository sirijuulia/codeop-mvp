# MVP - Siri Pantzar

This is a student project for Codeop's fullstack bootcamp.

---
Write something here about the project purpose

Write something here about the project tech stack

Any relevant graphs

## Set-up

### Dependencies

- Run npm install in the project folder
- cd client and run npm install in the client folder
- run npm install react n the client folder
- run npm install --save leaflet react-leaflet n the client folder
- run npm install react-tooltip in the client folder
- run install react-router-dom in the client folder

### Database Prep

1. Create a database called impactmap
2. Create an .env file with the following inputs:
    - DB_HOST=localhost
    - DB_USER=root
    - DB_NAME=impactmap
    - DB_PASS=[insert your MySQL password here]
3. Run npm run migrate in your terminal in the project folder. This will create two tables: users and actions, and add some initial values to both databases. **ACTION: Sort this out**

### Run Your Development Servers

- run npm start in project directory to start Express server on port 5000
- cd client and run npm run dev in client folder to start client server in development mode with hot reloading in port 5173
- Client is configured so all API calls will be proxied to port 5000 for a smoother development experience.
- You can test your client app in `http://localhost:5173`
- You can test your actions API in `http://localhost:5000/api/actions` . The users database is currently at a trial phase and does not have API calls. It can be modified in MySQL.

### Feature extensions

- I'd like to add an address layer to the map so users can search for a location insted of just using coordinates through the map or current location. This is especially important for accessibility.
- Eventually this app should have an authentification process and an admin view, plus an individual user view for each user.
- I'd like to have a side panel / view that shows all the actions as a list, and perhaps allows filtering (own actions, all actions, actions this week etc.)
- I'd like for users to be able to choose what marker to use for their actions and for those to show on the map. And/or for the markers for the user's own actions to be different from other people's markers (eg a different color)
- It would be great to add some more gamification features - eg likes, or badges for users who have submitted 5/10/20 actions, etc.

### Credits

- Fonts :
- Icons :
