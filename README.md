# UNICEF Giga Frontend Developer Assignment

To run the application in the development mode, run npm install, and then npm start.
Open http://localhost:3000 to view it in your browser.

# About 
This application is the solution for the Giga Frontend Developer Assignment

# Solution
For the development of the application, React 18 is used.
The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To see what the application provides, the user must Sign Up or Log In if he already has an account.
Once the user is authenticated, he can explore different cities on the map.

The map used in the application is Google Map provided in the package [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api)
The data shown in the map is data provided from the public API [Geo DB Cities API](http://geodb-cities-api.wirefreethought.com/). It is chosen because it provides different cities worldwide with additional data, and it is suitable for mapping as it has information about the city's coordinates.
The user can filter cities by its name and/or population. Also, the user can navigate through the results.
