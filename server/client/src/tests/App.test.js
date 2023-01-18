import React from "react";
import Header from "../components/Header";
import renderer from 'react-test-renderer';
import App from '../App';

const getRepos = require('../App');

// Snapshot test: tests if Header component renders correctly.
test('Header component renders correctly', () => {
  const tree = renderer
  .create(<Header/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// Snapshot test: tests if App component renders correctly.
test('main component renders correctly', () => {
  const tree = renderer
.create(<App /> )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// Unit test: tests if user is found at specific endpoint.
test('user is found at searchUser endpoint', () => {
  let searchName = process.env.REACT_APP_SEARCH_NAME;
  return fetch(`http://localhost:3000/searchUser/${searchName}`)
  .then(response => response.json())
  .then(data => {
    expect(data.data[0].userFound).toBe(true);
  })
})

// Unit test: tests if repos are found at specific endpoint.
test('projects are found at getRepos endpoint', () => {
  let searchName = process.env.REACT_APP_SEARCH_NAME;
  return fetch(`http://localhost:3000/searchUser/${searchName}/repos`)
  .then(response => response.json())
  .then(data => {
    expect(data.msg).toContain('Repos found for username');
  })
}, 60_000)

// test('projects are found at getRepos endpoint', () => {
//   // jest.setTimeout(60000);
//   let searchName = process.env.REACT_APP_SEARCH_NAME;
//   return fetch(`http://localhost:3000/searchUser/${searchName}/repos`).then(data => {
//     expect(data.data[0].gitHubProjects[0].repoFound).toBe(true);
//   });
// }, 60_000);