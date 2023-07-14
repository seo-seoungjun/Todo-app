require('dotenv').config();
const env = process.env;
const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use('/', express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = env.DB_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );

    const database = client.db('todolist');
    const loginCol = database.collection('login');

    app.listen(env.PORT, () => {
      console.log(`sever open`);
    });

    app.get('/', (req, res) => {
      res.render('login.ejs');
    });

    app.get('/register', (req, res) => {
      res.render('register.ejs');
    });

    app.use(
      session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    app.post(
      '/login',
      passport.authenticate('local', { failureRedirect: '/' }),
      (req, res) => {
        res.redirect('/main');
      }
    );

    app.post('/register', (req, res) => {
      const { id, pw } = req.body;
      loginCol.insertOne({ id, pw }, (err, result) => {
        if (err) throw err;
        res.redirect('/');
      });
    });

    passport.use(
      new LocalStrategy(
        {
          usernameField: 'id',
          passwordField: 'pw',
          session: true,
          passReqToCallback: false,
        },
        function (id, pw, done) {
          loginCol.findOne({ id }, function (err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false, { message: '존재하지 않는 아이디에요' });
            }
            if (pw == user.pw) {
              return done(null, user); //serializeUser로 데이터 전달
            } else {
              return done(null, false, { message: '존재하지 않는 비번이에요' });
            }
          });
        }
      )
    );

    passport.serializeUser(function (user, done) {
      console.log('세션 저장');
      done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
      loginCol.findOne({ id }, (err, result) => {
        console.log('이 세션 데이터를 가진 사람을 db에서 찾아주세요');
        done(null, result); //db에서 찾은 유저의 정보 (result)는 요청 바디에 user object로 전달된다
      });
    });

    app.get(
      '/main',
      (req, res, next) => {
        if (req.user) {
          next();
        } else {
          res.send('로그인을 해주세요');
        }
      },
      (req, res) => {
        res.render('main.ejs');
      }
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
