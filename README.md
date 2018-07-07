# ngrader
![nGrader logo](https://raw.githubusercontent.com/nisaruj/ngrader/master/public/images/ngrader.png)

The programming judge using Judge0 API.

## Demo
https://ngrader.herokuapp.com/

## TL;DR

```
git config --global core.longpaths true
git clone https://github.com/nisaruj/ngrader.git
cd ngrader
npm install
```
Then, change configurations in `config.json`<br>
To start the server, run:
```
npm start
```

## Getting Started

### Prerequisites

Before running the server, you will need MongoDB Database ~~and Google's recaptcha secret key~~. If you don't have one, check the links below.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Installing

<b>Important for window user:</b>
run command `git config --global core.longpaths true ` before clone the repo.


Change your MongoDB connection_string, secret key for authentication ~~and captcha secret~~ in config.json file (also keep them secret!).
```
"connection_string": "YOUR_DATABASE_URI_STRING",
"session_secret": "YOUR_SESSION_SECRET",
```
Then just run `npm start ` yay! :smiley:
<br><br>


In case you use Heroku, add config variables in settings tab.

| Config Vars    | Value                       |
| -------------- | --------------------------- |
| DB_STR         | database connection string  |
| SESSION_SECRET | authentication secret       |

## TODO

- [x] Fix homepage responsiveness
- [x] Redesign problem list page

## Dependencies
- body-parser: 1.18.2
- cookie-parser: 1.4.3
- ejs: 2.6.1
- express: 4.16.3
- express-session: 1.15.6
- mongoose: 5.0.18
- multer: 1.3.0
- passport: 0.4.0
- passport-local-mongoose: 5.0.0
- request: 2.85.0
- request-promise: 4.2.2

## Special Thanks
- [Judge0 API](https://api.judge0.com/) - The opensource web API for code compilation and execution.

## Team
- [Nisaruj Rattanaaram](https://github.com/nisaruj)
- [Ploypiti Piyaprapan](https://github.com/ploypiti)
