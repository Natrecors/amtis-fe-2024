const fs = require('fs').promises;
const fetch = require('node-fetch');

async function main() {

    const config = await fs.readFile('config.json', 'utf-8');
    const { baseUrl, endpoints } = JSON.parse(config);

    await getRequest(`${baseUrl}${endpoints.getPost}`);

    await postRequest(`${baseUrl}${endpoints.createPost}`);
}

async function getRequest(url) {
    try {
        const response = await fetch(url);
        console.log(`GET ${url}`);
        console.log(`Status Code: ${response.status}`);

        if (response.ok) {
            const responseBody = await response.json();
            console.log('Response Body:');
            console.log(responseBody);
        } else {
            console.error('Error: Unable to complete GET request.');
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

async function postRequest(url) {
    try {
        const postData = {
            title: "foo",
            body: "bar",
            userId: 1
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        console.log(`POST ${url}`);
        console.log(`Status Code: ${response.status}`);

        if (response.ok) {
            const responseBody = await response.json();
            console.log('Response Body:');
            console.log(responseBody);
        } else {
            console.error('Error: Unable to complete POST request.');
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

main();
