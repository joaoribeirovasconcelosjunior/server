// os controles que lida com as req e res

const User = require("../models/User");

module.exports = {
  async store(req,res){
      try {
      const { name, password } = req.body;
      await User.create({
        name: name,
        password: password,
      });
      return res.json({ mesage: "ok" });
    }
    catch(err){
      return res.status(400).json({erro: err});
    }
  },
  }

