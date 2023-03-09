# VS Code Live Share Overview

Watch the video!

https://vimeo.com/398354402

VSCode Docs:

https://docs.microsoft.com/en-us/visualstudio/liveshare/use/vscode

## Starting a Collaboration Session (Group/Pair)

- open the project root folder in VS Code
- have Live Share installed
- start a voice chat with the other group members (Slack)
- confirm everyone's mic is working and call integrity
- click the "Live Share" icon in VS Code
- select "Start Collaboration Session"
- once URL is in your clipboard, paste it into the group chat
- when everyone is in, & coding, make sure to add & commit regularly

## Joining a Collaboration Session (Group/Pair)

- connect with other members through voice chat in Slack
- click on session link when available
- if needed, sign in with github credentials
- once connected to session, code along with partners
- code will be saved on the computer of whomever started the session

## Sharing a server

Group members may want to run the app on their own computer, in their own Chrome Browser. VSCode allows you to "Share Server", so that all collaborators can access the `localhost` server like it's running on their own computer.

- Click on the "Live Share" icon in VSCode
- Select _Shared Servers_, then click _Share server..._
- You will be prompted for a port number. Enter the port of your node server (eg. `3000`)
- Collaborators can now access the server on their own computer (eg, by going to `http://localhost:3000` in Chrome)

See [the VSCode docs](https://docs.microsoft.com/en-us/visualstudio/liveshare/use/vscode#share-a-server) for more details, and screenshots.

## Sharing a terminal

If you want to view server logs or debug command-line issues, you may want to share access to your terminal. 

- Click on the "Live Share" icon in VSCode
- Select _Shared Terminals_, then click _Share terminal..._
- Select either _Read-only_ or _Read/write_
  - _Ready-only_ will not let users type anything into the terminal, but they can view your logs, for example. 
  - _Read/write_ allows users to execute commands in your terminal. **Only share write access with people you trust!** This gives another user full access to everything on your computer!

The terminal will show up in the built-in VSCode Terminal window (Ctrl+`). This feature can be a little buggy, you may have to try it a few times to get it to work properly.

See [VSCode docs](https://docs.microsoft.com/en-us/visualstudio/liveshare/use/vscode#share-a-terminal) for more details and screenshots.