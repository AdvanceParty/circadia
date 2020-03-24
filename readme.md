# Slashies - A Slash App For Royal Slackers

## About

Slack app designed to provide a central info/hub for staff presence and status.

Serverless functions inside the /api directory are executed on the now.sh platform when called via https. Each function is intended to be used as a callable endpoint for slash commands configured in your Slack App.

_See Also:_

- [Slack bot tokens](https://slack.dev/node-slack-sdk/tutorials/local-development#tokens-and-installing-apps)
- [Now.sh secrets](https://zeit.co/docs/v2/serverless-functions/env-and-secrets)

---

## Authentication

Auth0 is used for user authentication. See the Advance Party Auth0 account for configuration, roles, user management, etc.

User registration/access is restricted to GSuite accounts on the @theroyals.com.au domain.

---

## Dev

- Clone the repo
- `npm i` from the root directory to install required modules
- create .env and .env.build files in the root directory with name/value pairs as indicated in the \_env.sample file.
  - .env is required for production, while .env.build while allow you to access env variables when doing local de with `now dev`

## Dev Server

```
http://localhost:3000
```

`npm start` to launch local server for Now.sh Functions and React

NOTE: Ignore the terminal's message about accessing localhost at port 55497. This is the _now_ service. To run and test your app in the browser, hit the usual port 3000

---

## Deploy

### New deployments:

- Setup the Now CLI tool and login to your account
- Login to the now.sh accout where the app is hosted
- CD into the project's root folder and type `now`
- follow prompts to connect your local dev instance to the Now.sh project

---

## Requires

Node (built and test with Node 12, but _should_ be ok with 10 or 11).
