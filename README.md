teste webhook

# Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Runs the app pointing to the .env.development file.
It will run pointing to the API Proxy configured (http://api-proxy.conquista.sciensa.click).

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn local`

Runs the app in development mode.<br />
Runs the app pointing to the .env.local file.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn localAPI`

Runs a NODE server, which act as a proxy, redirecting auth login calls to PORTO
api.

### `yarn raise-db`

Runs a fake API, which we can simulate real API calls.

### `yarn test:watch`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Commit Convention

Our Commit Convetion is a lightweight convention on top of commit messages. It provides an easy set of rules for creating a commit. Following this commit convention is easy to read and understand commit before open it code.

### Why Use Commit Convetion

Automatically generating CHANGELOGs(Soon).
Communicating the nature of changes to teammates, the public, and other stakeholders.
Making it easier for people to contribute to your projects, by allowing them to explore a more structured commit history.

### Commit Notation

JiraId = TaskId | BugId
CommitBody = String

`[JiraId] - <CommitBody>`

### Examples

[PCNE-01] - add menu

[PCNE-01] - fix menu dropdown

Reference:
https://www.conventionalcommits.org/en/v1.0.0/

## Branch organization

Checkout a topic branch from the relevant branch, e.g. develop or master, and merge back againt that branch
If you start a task listed on Jira, create a branch folowing `Branch Name Notation`

### Branch Name Notation

Type = feature | bugfix | chore
JiraId = TaskId | BugId

`<Type>:<JiraId>`

### Examples

feature/PCNE-01

bugfix/PCNE-01

## Run Sonar on localhost

Download the following docker image of sonar:

`docker run -d --name sonarqube -p 9000:9000 sonarqube`

After the docker has started, run the command:

`yarn sonar:scan`

## Pull Request Guidelines

- It's OK to merge a PR if, and only if it has 2 approvals.
- It's OK to have multiple small commits as you work on the PR - GitHub will automatically squash it before merging.
- Make sure npm test passes. (VERY IMPORTANT)
- If adding a new feature:
- Add accompanying test case. (DO NOT FORGET)
- If fixing bug:
- Add appropriate test coverage if applicable. (DO NOT FORGET)
