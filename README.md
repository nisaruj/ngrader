# ngrader
The programming judge.

## Demo ##
https://ngrader.herokuapp.com/

## TL;DR ##

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

## Getting Started ##

### Prerequisites ###

Before running the server, you will need MongoDB Database and Google's recaptcha secret key. If you don't have one, check the links below.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [reCAPTCHA](https://www.google.com/recaptcha)

### Installing ###

<b>Important for window user:</b>
run command `git config --global core.longpaths true ` before clone the repo.


Change your MongoDB connection_string, secret key for authentication and captcha secret in config.json file (also keep them secret!).
```
"connection_string": "YOUR_DATABASE_URI_STRING",
...
"session_secret": "YOUR_SESSION_SECRET",
"captcha_secret": "YOUR_reCAPTCHA_SECRET"
```
Then just run `npm start ` yay! :smiley:
<br><br>


In case you use Heroku, add config variables in settings tab.

| Config Vars    | Value                       |
| -------------- | --------------------------- |
| DB_STR         | database connection string  |
| CPT_SECRET     | reCAPTCHA secret            |
| SESSION_SECRET | authentication secret       |

## TODO ##


## Dependencies ##
- body-parser 1.18.2
- ejs 2.5.7
- express 4.16.2
- mongoose 5.0.2
- multer 1.3.0
- express-session 1.15.6
- passport-local-mongoose 5.0.0
- express-recaptcha 4.0.2

## Team ##
- [Nisaruj Rattanaaram](https://github.com/nisaruj)
- [Ploypiti Piyaprapan](https://github.com/ploypiti)
