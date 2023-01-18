const express = require('express');
const helmet = require("helmet");
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

// --------------- Get User Profiles ---------------
// Get profiles endpoint with inputted search name from frontend.
app.get('/searchUser/:name', async (req, res) => {

    // Create empty arrays to store GitHub and Gitlab user profile and repos data.
    let profilesData = [];

    // Fetch GitHub profile data.
    let gitHubProfileResponse = await fetch(`https://api.github.com/users/${req.params.name}`);
    let gitHubProfileData = await gitHubProfileResponse.json();

    // Fetch GitLab profile data.
    let gitLabProfileResponse = await fetch(`https://gitlab.com/api/v4/users?username=${req.params.name}`);
    let gitLabProfileData = await gitLabProfileResponse.json();
    
    // If GitHub profile is not found, create gitHubProfile object with empty data 
    // and userFound set to false, and push to profilesData array.
    if (gitHubProfileData.message === "Not Found") {
        let gitHubProfile = {
            userFound : false,
            gitHubAvatar : "",
            gitHubUserName : "",
            gitHubProfileLink : "",
            gitHubBio : ""
        }
        profilesData.push(gitHubProfile);
    } else {
        // Else, create gitHubProfile object with relevant data and userFound set to true, 
        // and push to profilesData array.
        let gitHubProfile = {
            userFound: true,
            gitHubAvatar : gitHubProfileData.avatar_url,
            gitHubUserName : gitHubProfileData.login,
            gitHubProfileLink : gitHubProfileData.url,
            gitHubBio : gitHubProfileData.bio
        }
        profilesData.push(gitHubProfile);
    }

    // If GitLab profile is not found, create gitLabProfile object with empty data 
    // and userFound set to false, and push to profilesData array. 
    if (gitLabProfileData < 1) {
        let gitLabProfile = {
            userFound: false,
            gitLabAvatar : "",
            gitLabUserName : "",
            gitLabProfileLink : ""
        }
        profilesData.push(gitLabProfile);
    } else {
        // Else, create gitLabProfile object with relevant data and userFound set to true, 
        // and push to profilesData array.
        let gitLabProfile = {
            userFound: true,
            gitLabAvatar : gitLabProfileData[0].avatar_url,
            gitLabUserName : gitLabProfileData[0].username,
            gitLabProfileLink : gitLabProfileData[0].web_url
        }
        profilesData.push(gitLabProfile);
    }

    // If profilesData has no profiles, send custom response with 'not found' message to front-end.
    if (profilesData < 1) {
        let customResponse = {
            "msg" : `User not found! There are no users with the name "${req.params.name}" on GitLab or GitHub. `
        }
        res.send(customResponse);
    } else {
        // Else, send custom response object with profilesData for both GitHub and GitLab to front-end.
        let customResponse = {
            "msg" : `User found: ${req.params.name}`,
            "data" : profilesData
            
        }
        res.send(customResponse);    
    }
});

// --------------- Get User Repos ---------------
// Get repos endpoint with inputted search name from frontend.
app.get('/searchUser/:name/repos', async (req, res) => {
    let reposData = [
        {gitHubProjects : []},
        {gitLabProjects : []}
    ];

    // Fetch GitHub repo details.
    const gitHubRepoResponse = await fetch(`https://api.github.com/users/${req.params.name}/repos?per_page=5&sort=pushed`);
    const gitHubRepoData = await gitHubRepoResponse.json();
 
    // Fetch GitLab repo details.
    let gitLabRepoResponse = await fetch(`https://gitlab.com/api/v4/users/${req.params.name}/projects?per_page=5`);
    let gitLabRepoData = await gitLabRepoResponse.json();

    // If GitHub user's repos are not found, create gitHubRepoData object with empty data 
    // and repoFound set to false, and push to reposData's gitHubProjects array.
    if (gitHubRepoData.message === "Not Found" ) {
        const gitHubRepo = {
            repoFound: false,
            repoName : "",
            repoDescription : "",
            dateCreated : "",
            commitMessages : ""
        }

        reposData[0].gitHubProjects.push(gitHubRepo);
    } else {
        // Else, loop through gitHubRepoData:
        for (let i = 0; i < gitHubRepoData.length; i++) {
            // fetch the commits for each repo and store in commitsData.
            let repoCommits = await fetch(
                `https://api.github.com/repos/${req.params.name}/${gitHubRepoData[i].name}/commits?per_page=5`
            );
            let commitsData = await repoCommits.json();
            
            // create gitHubRepo object with relevant data, repoFound set to true, 
            // and empty commitMessages array. 
            const gitHubRepo = {
                repoFound: true,
                repoName : gitHubRepoData[i].name,
                repoDescription : gitHubRepoData[i].description,
                dateCreated : (gitHubRepoData[i].created_at).substr(0, 10),
                commitMessages : []
                
            }

            // loop through commitsData and push all commit messages and their dates for each repo to 
            // gitHubRepo's commitMessages array.
            for (let j = 0; j < commitsData.length; j++) {
                let tempCommit = {
                    commitMsg : (commitsData[j].commit.message).substr(0, 100),
                    commitDate : (commitsData[j].commit.author.date).substr(0, 10)
                }
                gitHubRepo.commitMessages.push(tempCommit);
            }

            // push the repo to the gitHubProjects in reposData. 
            reposData[0].gitHubProjects.push(gitHubRepo);
        }
    }

    // If GitLab user's repos are not found, create gitLabRepoData object with empty data 
    // and repoFound set to false, and push to reposData's gitLabProjects array. 
    if (gitLabRepoData.message === "404 User Not Found" ) {
        const gitLabRepo = {
            repoFound: false,
            repoName : "",
            repoDescription : "",
            dateCreated : "",
            commitMessages : ""
        }

        reposData[1].gitLabProjects.push(gitLabRepo);
    } else {
        // Else, loop through gitLabRepoData:
        for (let i = 0; i < gitLabRepoData.length; i++) {
            // fetch the commits for each repo and store in commitsData. 
            let repoCommits = await fetch(
                `https://gitlab.com/api/v4/projects/${gitLabRepoData[i].id}/repository/commits?per_page=5`
            );
            let commitsData = await repoCommits.json();

            // create gitLabRepo object with relevant data, repoFound set to true, 
            // and empty commitMessages array.
            const gitLabRepo = {
                repoFound: true,
                repoName : gitLabRepoData[i].name, 
                repoDescription : gitLabRepoData[i].description,
                dateCreated : (gitLabRepoData[i].created_at).substr(0, 10),
                commitMessages : []
            }

            // loop through commitsData and push all commit messages and their dates for each repo to 
            // gitLabRepo's commitMessages array.
            for (let j = 0; j < commitsData.length; j++) {
                let tempCommit = {
                    commitMsg : (commitsData[j].title).substr(0, 100),
                    commitDate : (commitsData[j].created_at).substr(0, 10)
                } 
                gitLabRepo.commitMessages.push(tempCommit);
            }

            // push the repo to the gitLabProjects in reposData.
            reposData[1].gitLabProjects.push(gitLabRepo);
        }
    }

    // If reposData has no profiles, send custom response with 'not found' message to front-end.
    if (reposData < 1) {
        let customResponse = {
            "msg" : `User repos not found! There are no repos for the username "${req.params.name}" on GitLab or GitHub. `
        }
        res.send(customResponse);
    } else {
        // Else, send custom response object with reposData for both GitHub and GitLab to front-end.
        let customResponse = {
            "msg" : `Repos found for username: "${req.params.name}"`,
            "data" : reposData 
        }
        res.send(customResponse);    
    }  
});

// Listen on port 3001.
module.exports = app.listen(port, () => {console.log(`Listening on port ${port}`)});