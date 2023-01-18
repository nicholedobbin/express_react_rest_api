import React, { useState } from 'react';

// Bootstrap imports.
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function SearchBar( {getUser, handleChange, searchName, option, handleOption} ) {
  // Return a search bar with input and button that calls getUser function on click, and 
  // return a 'choice' div that displays the GitHub or GitLab options for the user to select
  // which API details they want to display.
  return (
    <>
      <div className="formSection mt-4 pt-4">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label className="display-6 pb-4">Enter username:</Form.Label>
            <Form.Control className="mb-4" type="text" value={searchName} onChange={handleChange}/>
          </Form.Group>
          <Button className="btn btn-lg searchButton" variant="secondary" type="button" onClick={getUser}>
            Search
          </Button>
        </Form>
      </div>
      <div className='choiceDiv my-5'>
        <div className={option ? "choiceItem" : "choiceItem selected"} onClick={()=> handleOption(0)}>View GitHub</div>
        <div className={option ? "choiceItem selected" : "choiceItem"} onClick={()=> handleOption(1)}>View GitLab</div>
      </div>
    </>
  )
}
