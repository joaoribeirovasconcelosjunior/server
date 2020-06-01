// os controles que lida com as req e res
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 4;
const jwtSecret = "SECRET";


const User = require("../models/User");

module.exports = {
  async index( req, res ) {
    try {
      const all_users = await User.findAll();
      return res.json(all_users);
    }
    catch(err){
      return res.status(400).json({erro: err});
    }
  },

  async login( req, res ) {
    try {

      const { name, password, email } = req.body;
      const user = await User.findAll({where: {
        email: email,
      }});

      /* essa verificação não é muito interessante mais é a que eu sei fazer*/

      if (user != ''){

        const hashPassword = user.map(i => {
          return i.password;
        });
        const hasPASS = hashPassword.toString();

        if (await bcrypt.compare(password,hasPASS)){
          const token = jwt.sign({name}, jwtSecret, {
            expiresIn: 86400,
          });
          return res.status(200).json({jwt: token});
        }
        else{
          return res.status(400).json({erro: "password/username incorrect!"});
        }

      }
      else{
        return res.status(400).json({erro: "User is NOT registered!"});
      }
    }
    catch(err){
      return res.status(400).json({erro: err});
    }
  },

  async register(req,res){
    try {
      const { name, password, email } = req.body;

      const EMAIL = await User.findAll({where: {
        email: email,
      }});

      /* essa verificação não é muito interessante mais é a que eu sei fazer*/
      if (EMAIL == ''){
        await User.create({
          name:  name,
          password: await bcrypt.hash(password, saltRounds),
          email: email,
        });
        const token = jwt.sign({name}, jwtSecret);
        return res.status(200).json({sucess: "create user",jwt: token});

      }
      else{
        return res.status(400).json({erro: "User already registered!"});
      }

    }


    catch(err){
      return res.status(400).json({erro: err});
    }
  },
}

