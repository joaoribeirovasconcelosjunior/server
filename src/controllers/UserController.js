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

      const { name, password } = req.body;
      const user = await User.findAll({where: {
        name: name,
      }});

      /* essa verificação não é muito interessante mais é a que eu sei fazer*/

      if (user != ''){
        const hashPassword = user.map(i => {
          return i.password;
        });
        var x = hashPassword.toString();
        console.log("chegou");
        if (await bcrypt.compare(password,x)){
          const token = jwt.sign({name}, jwtSecret);
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
      const { name, password } = req.body;

      const user = await User.findAll({where: {
        name: name,
      }});
      console.log(`usuario é ${user}`);

      /* essa verificação não é muito interessante mais é a que eu sei fazer*/
      if (user == ''){
        await User.create({
          name:  name,
          password: await bcrypt.hash(password, saltRounds),
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

