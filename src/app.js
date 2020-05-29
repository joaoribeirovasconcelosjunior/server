const express =  require("express");
const app = express();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userDB = { }; // temporario
const saltRounds = 4;
const jwtSecret = "SECRET";

function errorCatchHandler(error,req,res,next) {
  console.error(error);

  res.status(error.statusCode || 500).json({ error: true, msg: error.message});

}

function demandString(str){
  if (!str || Object.prototype.toString.call(str) !== "[object String]") {
    const error = new Error(`Exoected string value, but got ${str}`);
    error.statusCode = 400;

    throw error;
  }
}

async function createUserHandler (req,res) {
  try {
    const { user,password } = req.body;
    demandString(user);
    demandString(password);

    if(userDB[user]){
      const error = new Error(`User ${user} already registered!`);
      error.statusCode = 440;
      throw error;
    }
    userDB[user] = { hashedPassword: await bcrypt.hash(password, saltRounds) };
    const token = jwt.sign({user }, jwtSecret);
    res.status(201).json({ userCreated: true, jwt: token });
  }
  catch(err) {
    errorCatchHandler(err,req,res);
  }
}


async function LoginUserHandler(req,res) {
 try {
   const { user, password } = req.body;

   demandString(user);
   demandString(password);
   if(!userDB[user]) {
     const error = new Error(`User ${user} NOT registed!`);
     error.statusCode = 400;

     throw error;
   }
   const { hashedPassword } = userDB[user];

   if (!await bcrypt.compare(password,hashedPassword)) {
     const error = new Error(`Invalid login/password`);
     error.statusCode = 400;

     throw error;
   }

    const token = jwt.sign({user }, jwtSecret);
   res.status(200).json({ sucess: true, jwt: token });

 }
  catch(err)
  {
    errorCatchHandler(err,req,res);
  }
}

const bodyParser = require("body-parser");

app.use(express.json());
app.use(errorCatchHandler);
app.post("/create-user", bodyParser.json(), createUserHandler);
app.post("/login-user", bodyParser.json(), LoginUserHandler);

app.use(function (req, res) {
  res.status(400).json({notFound: true, code: 404});

});
app.listen(3000, () => {
  console.log(`rodando`);
});

