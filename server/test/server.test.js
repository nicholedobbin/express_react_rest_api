const fetch = require('node-fetch');
const expect = require('chai').use(require('chai-as-promised')).expect;

// unit test for fetch profiles
describe('Express endpoints testing', () => {
    it ('GET profiles', async () => {
        let res =  await fetch(`http://localhost:3001/searchUser/nicholedobbin`);
        let response = await res.json();
        console.log(response);
        expect(response).to.haveOwnProperty('msg');
        expect(response.msg).to.contain('nicholedobbin');
        done();
    })
})
