# Local folder set-up with npm, express, then push to Github

1. Create folder/directory
2. `cd` into this new folder
3. Run `git init`
4. Make `.gitignore` and `readme.md` files
5. Create new repo on Github, no readme and no .gitignore (because we just made those locally!)
6. Run `npm init -y` in terminal to generate `package.json`
7. Add start script to `package.json`
    - `"start" : "node server/server.js"`
8. Run `npm install express` (will include body-parser)
9. Run `git add .`
10. Run `git commit -m "initial commit"`
11. Follow the instructions on the Github page for how to "push an existing repository from the command line" (shown below)
    - Run `git remote add origin <URL-FROM-GITHUB-REPO>`
    - Run `git push -u origin main` to populate the new Github repo with your local folder contents.