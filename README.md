# ScoreFeed
The Scorefeed-code originally made for #scores-feed on Dane Saber Discord
<br />

JavaScript-version can be found [here](https://github.com/DanishBeatSaber/ScoreFeedJS/tree/main/ScoreFeed) (Please go for the TypeScript-version, it's easier to work with :>)
TypeScript-version can be found [here](https://github.com/DanishBeatSaber/ScoreFeedJS/blob/main/ScoreFeed_TS)

# What is this?

To put it simply, ScoreFeedJS hooks into the ScoreSaber Websocket for their [Scores-page](https://scoresaber.com/scores), and with some configuration, it posts the desired scores to a Discord-textchannel: <br />


# READ ME FIRST, PLEASE!
> [!CAUTION]
> Due to the way that components work on Discord-messages, you **need** a Discord-webhook created by a Discord application.  
> If you **DON'T** use an application created webhook you will encounter the following problems, maybe others:  
>  
> V1 version (JavaScript): Buttons will **NOT** be functional or fully missing.
> V2 version (JavaScript/TypeScript): The message will be fully missing.  
>  
> So how do I solve this?
>   
> There's a [guide here](https://web.archive.org/web/20250212204907/https://hookdeck.com/webhooks/platforms/tutorial-how-to-configure-discord-webhooks-using-the-api), on how to create the webhook you need.

After reading this, and you still can't get it to work, feel free to raise an issue, and I will see what I can do to help.  

In the issue, please state what you have already done, and what problem you're facing, thank you!

## V1 Example
<img src="./Preview.png" />

## V2 Example
<img src="./v2.png" />


# How to run

Run `npm install` or `yarn` in `ScoreFeed`

Configure `.env`

For the **JavaScript**-version: Run `npm run start` or `yarn start`  
For the **TypeScript**-version: Run `npm run prod` or `yarn prod`

# Data recieved from the [ScoreSaber WebSocket](./WSDataStructure.json)
