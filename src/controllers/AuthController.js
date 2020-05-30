const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userDB = { }; // temporario
const saltRounds = 4;
const jwtSecret = "SECRET";

function demandString(str){

  if (!str || Object.prototype.toString.call(str) !== "[object String]") {
    const error = new Error(`Exoected string value, but got ${str}`);
    error.statusCode = 400;

    throw error;
  }
}

function errorCatchHandler(error,req,res) {
  console.error(error);

  res.status(error.statusCode || 500).json({ error: true, msg: error.message});

}

module.exports = {

async  createUserHandler (req,res) {
  try {
    const { user,password } = req.body;
    console.log(req.body);

    demandString(user); // verifica se é uma string
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
},


async  LoginUserHandler(req,res) {
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


/*app.use( (req, res) {
  res.status(400).json({notFound: true, code: 404});

});*/


}

