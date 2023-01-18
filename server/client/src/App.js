import './App.css';
import { useState } from 'react';

// Component imports
import SearchBar from './components/SearchBar';
import GitHubResults from './components/GitHubResults';
import Header from './components/Header';
import GitLabResults from './components/GitLabResults';

// Boostrap imports
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/cjs/ListGroupItem';

function App() {
  // --------------- Set State ---------------
  // GitHub and GitLab user profiles (all data from server).
  const [userProfiles, setUserProfiles] = useState();

  // GitHub profile and repo data.
  const [gitHubAvatar, setGitHubAvatar] = useState();
  const [gitHubName, setGitHubName] = useState();
  const [gitHubProfileLink, setGitHubProfileLink] = useState();
  const [gitHubBio, setGitHubBio] = useState();
  const [gitHubRepoData, setGitHubRepoData] = useState();

  // GitLab profile and repo data.
  const [gitLabAvatar, setGitLabAvatar] = useState();
  const [gitLabName, setGitLabName] = useState();
  const [gitLabProfileLink, setGitLabProfileLink] = useState();
  const [gitLabRepoData, setGitLabRepoData] = useState();

  // General states.
  const [searchName, setSearchName] = useState("");
  const [option, setOption] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);

  // --------------- Get User Profiles ---------------
  async function getUser() {
    setLoading(true);
    // Get all GitHub and GitLab profiles data for inputted username.
    let response = await fetch(`/searchUser/${searchName}`);
    let profilesData = await response.json();

    // Set userProfiles state to store GitHub and GitLab profiles data.
    setUserProfiles(profilesData.data);
    
    // set GitHub profile details.
    setGitHubName(profilesData.data[0].gitHubUserName);
    setGitHubProfileLink(profilesData.data[0].gitHubProfileLink);
    setGitHubAvatar(profilesData.data[0].gitHubAvatar);
    setGitHubBio(profilesData.data[0].gitHubBio);

    // set GitLab profile details.
    setGitLabName(profilesData.data[1].gitLabUserName);
    setGitLabProfileLink(profilesData.data[1].gitLabProfileLink);
    setGitLabAvatar(profilesData.data[1].gitLabAvatar);

    setLoading(false);
    // Call function to get repos for the inputted username.
    getRepos(searchName);
  }

  // --------------- Get User Repos ---------------
  async function getRepos(searchName) {
    setLoadingRepos(true);
    // Get all GitHub and GitLab repo data for inputted username.
    let response = await fetch(`/searchUser/${searchName}/repos`);
    let repoData = await response.json();

    // create seperate repoLists to store data for GitHub and GitLab repos.
    let gitHubRepoList = repoData.data[0].gitHubProjects;
    let gitLabRepoList = repoData.data[1].gitLabProjects;

    // Loop through gitHubRepoList:
    for (let i = 0; i < gitHubRepoList.length; i++) {
      // If the gitHubRepoList item's repoFound value is true:
      if (gitHubRepoList[i].repoFound === true) {
        // Map through gitHubRepoList and the commitsMessages for that repo and return relevant details.
        let gitHubRepoInfo = gitHubRepoList.map((repo, index) => {
          return (
            <ListGroup key={index} className="text-start">
              <ListGroup.Item className="repoList">
                <div className="repoTitle">{repo.repoName}</div>
                <div className="pb-2">Created on: {repo.dateCreated}</div>
                <div className="repoDescription pb-2">
                  Description:
                  <br></br>
                  {repo.repoDescription}
                </div>
                <div>
                  <span className="latestCommitsHeading">Latest Commit Messages:</span>
                  <br></br>
                  {repo.commitMessages.map((message, index) => {
                    return (
                      <ListGroup.Item className="repoCommits" key={index}>
                        {message.commitDate}:
                        <br></br>
                        {message.commitMsg} 
                      </ListGroup.Item>
                    )
                  })}
                </div>
              </ListGroup.Item>
            </ListGroup>
          )
        })

        // Set gitHubRepoData to value of gitHubRepoInfo.
        setGitHubRepoData(gitHubRepoInfo);

      } else {
        // Else, create noReposMsg React element and set gitHubRepoData to this value. 
        let noReposMsg = (
          <ListGroup>
            <ListGroupItem>No GitHub repos found for this user </ListGroupItem>
          </ListGroup>
        );
        setGitHubRepoData(noReposMsg);
      }
    }

    // Loop through gitLabRepoList:
    for (let i = 0; i < gitLabRepoList.length; i++) {
      // If the gitLabProjects' repoFound value is true:
      if (gitLabRepoList[i].repoFound === true) {
        // Map through gitLabRepoList and the commitsMessages for that repo and return relevant details.
        let gitLabRepoInfo = gitLabRepoList.map((repo, index) => {
          return (
            <ListGroup key={index} className="text-start">
              <ListGroup.Item className="repoList">
                <div className="repoTitle">{repo.repoName}</div>
                <div className="pb-2">Created on: {repo.dateCreated}</div>
                <div className="repoDescription pb-2">
                  Description:
                  <br></br>
                  {repo.repoDescription}
                </div>
                <div>
                  <span className="latestCommitsHeading">Latest Commit Messages:</span>
                  <br></br>
                  {repo.commitMessages.map((message, index) => {
                    return (
                      <ListGroup.Item className="repoCommits" key={index}>
                        {message.commitDate}:
                        <br></br>
                        {message.commitMsg} 
                      </ListGroup.Item>
                    )
                  })}
                </div>
              </ListGroup.Item>
            </ListGroup>
          )
        })

        // Set gitLabRepoData to value of gitLabRepoInfo.
        setGitLabRepoData(gitLabRepoInfo);

      } else {
        // Else, create noReposMsg React element and set gitHubRepoData to this value. 
        let noReposMsg = (
          <ListGroup>
            <ListGroupItem>No GitLab repos found for this user</ListGroupItem>
          </ListGroup>
        );
        setGitLabRepoData(noReposMsg);
      }
    }
    // setLoading(false);
    setLoadingRepos(false);
  }

  // Handle change function for SearchBar component's onChange value.  
  const handleChange = (e) => {
    setSearchName(e.target.value);
  }
  // Handle option function for SearchBar component's onClick value.
  const handleOption = (e) => {
    setOption(e);
  }

  return (
    <div className="App">
      <Header />
      <div className="App justify-content-center align-items-center d-flex flex-column">
        <SearchBar
          getUser = {getUser}
          handleChange = {handleChange}
          searchName = {searchName}
          option = {option}
          handleOption = {handleOption}
        />
        { loading ? <p>Loading...</p> : option ? <GitLabResults
          userProfiles = {userProfiles}
          gitLabAvatar = {gitLabAvatar}
          gitLabName = {gitLabName}
          gitLabProfileLink = {gitLabProfileLink}
          searchName = {searchName}
          gitLabRepoData = {gitLabRepoData}
          loadingRepos = {loadingRepos}
        /> :
          <GitHubResults
            userProfiles = {userProfiles}
            gitHubAvatar = {gitHubAvatar}
            gitHubName = {gitHubName}
            gitHubProfileLink = {gitHubProfileLink}
            gitHubBio = {gitHubBio}
            searchName = {searchName}
            gitHubRepoData = {gitHubRepoData}
            loadingRepos = {loadingRepos}
          /> }
      </div>
    </div>
  );
}

export default App;
