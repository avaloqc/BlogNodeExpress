# mongoDB : URI error# 
It no longer accepts the word "localhost" needs to be 127.0.0.1 in order to stablish connection to the local machine. 

FIX: URL= mongodb://127.0.0.1:27017/collection'. SOURCE: mongoDB forums

# .css error #
Files getting send in the url/routing, breaking ccs or sending server errors. 

FIX: To prevent this put /id: request at the top of the request or refactor the static middleware to read from (__dirname).
Include following line in your app.js file.

`app.use(express.static( __dirname + "/public"));`
In your *styles.css link* tag,

`<link rel="stylesheet" href="/stylesheets/style.css"/>`

In this example *styles.css* file is saved in *public/stylesheets/style.css*, Please follow instructions according to your own folder structure. Notice the '/' at the start of href in link tag. https://stackoverflow.com/questions/35110661/express-routing-error-cast-to-number-failed-for-value-style-css-at-path


