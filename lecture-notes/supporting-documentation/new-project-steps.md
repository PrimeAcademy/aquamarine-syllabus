# Creating a new project

At this point...

1. Create project on GitHub with `README.md` and node `.gitignore` options on GitHub selected
2. Clone project onto your computer
3. Create new folder `server`
4. Create new file in `server` folder called `server.js`
5. Run `npm init -y` in terminal to generate `package.json`
6. Edit `package.json` to make sure that:
    - make start script `"start": "node server/server.js"`
    - update `main` property to `server/server.js`
7. npm install the node modules we are using `npm install express body-parser pg jquery`
8. If you didn't add it through GitHub, make sure you create a `.gitignore` and ignore the `node_modules` (the visual studio code icon shouldn't say `99+`)