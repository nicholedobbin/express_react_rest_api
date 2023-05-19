# **React and Express Project using GitHub and GitLab REST APIs**

## **IFS L4T30 - Capstone 4**

## **Description**
This is a full-stack web application that interfaces with the GitHub and Gitlab APIs, and contains the following features:
* User search box with results from both platforms.
* User details including username, profile picture, bio, latest repos. 
* Repo details including creation date, description, and last 5 commits’ date and description.

### What's happening in the back-end (Node.js/Express)?
The [server.js](/server/server.js) file gets the inputted username's profile and repo data from the GitHub and Gitlab API's, and stores the data in object arrays that can be fetched by the fron-end.

### What's happening in the front-end (React)?
The [App.js](/server/client/src/App.js) file gets the inputted username from form input, and fetches data from the backend using the respective endpoint for each (i.e. profiles endpoint and repos endpoint). It stores the data in their respective states and outputs the relevant data for each component.

<hr>

## **Installation and Setup**
1. Clone the repo and open with your preferred IDE (e.g. VSCode).
2. In the command line, navigate to the *server* folder and install the dependencies: `npm install`
2. Open a new/split terminal window and navigate to the *client* folder and install the dependencies: `npm install`
3. In the *server* folder, run the project's server: `npm start`
4. In the *client* folder, run the project's server: `npm start`
5. This should open the React app in your browser automatically. You can also navigate to http://localhost:3000/

<hr>

## **How To Use**
1. Enter the username you want to search for in the APIs, and click the **Search**  button.
2. If there is a GitHub/GitLab user with the username entered, it will display the user's profile and repo data. If there is no profile found with that username, it will display a message stating this.
3. Navigate between GitHub and GitLab repo data by clicking on the green *"View GitHub"* and *"View GitLab"* tabs.

## **What does it look like?**
![Screenshot of web app](markdown/GitHub%20GitLab%20API%20Search.png)

<hr>

## Testing the App
This project contains testing files with snapshot and unit tests for both the front-end and back-end of the application. They can be found in the [server/test](/server/test/) and [/server/client/src/tests/](/server/client/src/tests/) filepaths.

To run the tests, open the command line in the server or client folders (depending on which end you're testing) and enter `npm test`.

<hr>

## **Credit and References**
Made by [Nichole Dobbin](https://github.com/nicholedobbin), for my [HyperionDev](https://www.hyperiondev.com/) course.