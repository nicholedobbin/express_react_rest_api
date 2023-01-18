import React from 'react';

// Boostrap imports
import Card from 'react-bootstrap/Card'; 

export default function GitHubResults({ 
    userProfiles, gitHubAvatar, gitHubName, gitHubProfileLink, gitHubBio, searchName, gitHubRepoData, loadingRepos }) {
    // If userProfiles is empty, return an empty paragraph.
    if (!userProfiles) {
        return (<p></p>)
    } else if ((userProfiles[0].userFound === false)) {
        // Else, if GitHub (index[0]) profile's userFound property is false, return 'no user found' message.
        return (
            <div className='my-5'>
                <h3>There are no users with the name { searchName } on GitHub.</h3>
            </div>
        )
    } else {
        // Else, return GitHub profile and repo data.
        return (
            <div>
                <Card className="resultsCard">
                    
                    <Card.Body>
                        <Card.Title className="py-2 fs-2 d-flex align-items-center justify-content-center">
                            <Card.Img variant="bottom" className="rounded-circle w-25" src= { gitHubAvatar } />
                            &nbsp;&nbsp;
                            <Card.Link className="profileName" href = { gitHubProfileLink } target = 'blank'>{ gitHubName }</Card.Link>
                        </Card.Title>
                        <Card.Subtitle className=" pt-3 px-4 text-muted">{ gitHubBio }</Card.Subtitle>
                    </Card.Body>
                    <Card.Body>
                        <Card.Title className="reposHeading">Latest Repos & Commits</Card.Title>
                        {loadingRepos ? <p>Repos Loading...</p> : gitHubRepoData}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
