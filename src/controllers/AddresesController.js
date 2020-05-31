
/* IGNORAR NÂO ESTE CODÍGO NÂO ESTÁ SENDO USADO */
/* IGNORAR NÂO ESTE CODÍGO NÂO ESTÁ SENDO USADO */
/* IGNORAR NÂO ESTE CODÍGO NÂO ESTÁ SENDO USADO */

const Addreses = require("../models/Addreses");
const User = require("../models/User");
module.exports = {
  async store(req,res){
    try {
      const { user_id } = req.params;
      const { ranking, kd } = req.body;

      const user = await User.FindByPk(user_id);

      if (!user){
        return res.status(400).json({erro: "usuario não encontrado"});
      }
      await Addreses.create({
      });

     return res.json({ mesage: "sucess" });
    }
    catch(err){
      return res.status(400).json({erro: err});
    }
  },
}


