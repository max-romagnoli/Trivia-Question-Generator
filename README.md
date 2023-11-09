# backend

## Explanation of Files

### app.py
Kind of the equivalent to a Controller in Java Spring.

All of our routes/request mappings and corresponding logic goes here

### util.py
Optional file where we can put any helper code. Doesn't have to be called any specific name (could be contants.py, helpers.py, random_name.py, etc). Just helps with having cleaner code

### requirements.txt
This is a file for Python environments to be able to easily set up your requirements. For example, our current requirements are Flask, requests (useful for HTTP request helpers), gunicorn (I think I might need it for hosting the app online)

### Static and Template
These folders are usually present in Flask projects for storing HTML/CSS/JavaScript, but we probably won't be needing them since we are doing a separate React frontend. We can probably delete them later.