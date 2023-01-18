import React from 'react'

export default function Header() {
  return (
        <div className="headerSection py-5">
            <h1 className="headerTitle py-3  display-2">GitHub & GitLab API Search</h1>
            <p className="headerDescription w-75 mx-auto py-3">
                Find a user from the GitHub & GitLab API's by entering the username in the search bar.
                Switch between the 'View GitHub' and 'View GitLab' options to view profile and repo details.  
            </p>
        </div>
  )
}
