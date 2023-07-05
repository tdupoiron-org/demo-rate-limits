//Use github rest api to get the list of repositories for user tdupoiron
const { Octokit } = require("@octokit/core");
const core = require('@actions/core');

const NbLoops = core.getInput('NB_LOOPS');
const IntervalMilli = core.getInput('INTERVAL_MILLI');

async function getRepositories() {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  await octokit.request('GET /users/{username}/repos', {
    username: 'tdupoiron'
  }).then(({ data }) => {
    console.log(data);
  }
  );
}

async function main() {

  // Check input variables
  if (NbLoops == null || NbLoops == "") {
    console.log("NB_LOOPS is not defined");
    return;
  }
  if (IntervalMilli == null || IntervalMilli == "") {
    console.log("INTERVAL_MILLI is not defined");
    return;
  }

  for (let i = 0; i < NbLoops; i++) {
    console.log(`Loop ${i}`);
    await getRepositories();
    sleep(IntervalMilli);
  } 
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

main();