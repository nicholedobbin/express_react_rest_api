import React from 'react';

// Boostrap imports
import Card from 'react-bootstrap/Card';

export default function GitLabResults({ 
    userProfiles, gitLabAvatar, gitLabName, gitLabProfileLink, searchName, gitLabRepoData, loadingRepos } ) {
    // If userProfiles is empty, return an empty paragraph.
    if (!userProfiles) {
        return (<p></p>)
    } else if (userProfiles[1].userFound === false) {
        // Else, if GitLab (index[1]) profile's userFound property is false, return 'no user found' message.
        return (
             <div>
             <Card style={{ width: '30rem' }}>
                 <Card.Body>
                     <Card.Title className="py-2 fs-2">
                        There are no users with the username "{ searchName }" on GitLab.
                     </Card.Title>
                 </Card.Body>
             </Card>
         </div>
        )
    } else {
        // Else, return GitLab profile and repo data.
        return (
            <div>
                <Card style={{ width: '30rem' }}>
                    
                    <Card.Body>
                        <Card.Title className="py-2 fs-2 d-flex align-items-center justify-content-center">
                            <Card.Img variant="top" className="rounded-circle w-25" src= { gitLabAvatar } />
                            &nbsp;&nbsp;
                            <Card.Link className="profileName" href = { gitLabProfileLink } target = 'blank'>{ gitLabName }</Card.Link>
                        </Card.Title>
                    </Card.Body>
                    <Card.Body>
                        <Card.Title className="reposHeading">Latest Repos & Commits</Card.Title>
                        {loadingRepos ? <p>Repos Loading...</p> : gitLabRepoData}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
