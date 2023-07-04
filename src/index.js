//Use github rest api to get the list of repositories for user tdupoiron
const { Octokit } = require("@octokit/core");

async function getRepositories() {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  octokit.request('GET /users/{username}/repos', {
    username: 'tdupoiron'
  }).then(({ data }) => {
    console.log(data);
  }
  );
}

getRepositories();