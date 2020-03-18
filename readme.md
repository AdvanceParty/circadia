# Slashies - A Slash App For Royal Slackers

## About

A basic app designed to serve as an endpoint for custom slash commands in Slack workspaces.

Serverless functions inside the /api directory are executed on the now.sh platform when called via https. Each function is intended to be used as a callable endpoint for slash commands configured in your Slack App.

_See Also:_

- [Slack bot tokens](https://slack.dev/node-slack-sdk/tutorials/local-development#tokens-and-installing-apps)
- [Now.sh secrets](https://zeit.co/docs/v2/serverless-functions/env-and-secrets)

---

## Dev

- Clone the repo
- `npm i` from the root directory to install required modules
- create a .env file in the root directory with the name/value pair
  - AU_COM_ADVANCEPARTY_SLASHIE_TOKEN=YOUR_BOT_TOKEN

---

## Deploy

### New deployments:

- Setup the Now CLI tool and login to your account
- Create a new secret on your server called AU_COM_ADVANCEPARTY_SLASHIE_TOKEN and set its value to your bot user token
- CD into the project's root folder and type `now`
- That's all!

### Updating existing deployments

As above, on the proviso that the now.sh account is connected to the instance you want to update.

---

## Requires

Node (built and test with Node 12, but _should_ be ok with 10 or 11).
