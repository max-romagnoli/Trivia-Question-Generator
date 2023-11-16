# Deploy to Heroku

### Requirements (Only first time)
* On the invitation email click *Accept Invitation* and create a Heroku account.
  * You will probably need to enable two-factor authentication with Salesforce Authenticator
* Download Heroku CLI from https://devcenter.heroku.com/articles/heroku-cli
  * You will be prompted to access your Heroku account.
* Make sure Heroku is in your PATH by running `heroku --version`
  * Note: you might need to restart your IDE after installing Heroku

### Build React app
* First change the following lines:
  * In `frontend/src/index.js Line 11` > Swap the `BACKEND_ADDRESS` constants
    * This will allow the React to access the deployed backend instead of localhost
  * In `frontend/.gitignore Line 13` > Comment out `/build`
    * To allow build files to be pushed to Heroku (conversely, this needs to be toggled when pushing to our repo on Gitlab)
  * In `app.py Line 3 & 7` > Comment out CORS
* Generate build files for production using `npm run build`
  * This will basically pack the React application for production so that it can be retrieved by the backend when deployed
* Run `heroku git:remote -a group-16`
  * Connects your local repo to the remote hosted in Heroku
* IMPORTANT: commit all changes you want to be deployed before pushing
  * So do `commit` and `add` as needed
* Run `git push heroku your-branch-name:master`
  * This will take a bit. If you see there is no error the app should be deployed.


# backend

## Explanation of Files

### app.py
Kind of the equivalent to a Controller in Java Spring.

All of our routes/request mappings and corresponding logic goes here

### util.py
Optional file where we can put any helper code. Doesn't have to be called any specific name (could be contants.py, helpers.py, random_name.py, etc). Just helps with having cleaner code

### requirements.txt
This is a file for Python environments to be able to easily set up your requirements. For example, our current requirements are Flask, requests (useful for HTTP request helpers), gunicorn (I think I might need it for hosting the app online)

So if you want to be able to run our backend on your local machine, you would first do: 

`pip install -r requirements.txt` 

in your terminal/command prompt/powershell/etc.. This would install all those python libraries listed in requirements.txt on your laptop.

You could also create a virtual environment to install all this stuff in a folder specific to this project rather than on your whole laptop's system. But this is optional ...

This is the way you can do it through terminal/command line if you are using Visual Studio Code or Eclipse or something. There is probably an easier way to install python requirements in PyCharm IDE if you are using that but could probably still do the same thing i'm just not sure how. 

### Static and Template
These folders are usually present in Flask projects for storing HTML/CSS/JavaScript, but we probably won't be needing them since we are doing a separate React frontend. We can probably delete them later.