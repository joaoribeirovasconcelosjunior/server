module.exports = {

 async login(req, res) {
    try {
      const { title, conteudo } = req.body;
      return res.json({ mesage: "ok" });
    }
    catch(err){
      return res.status(400).json({erro: err});
    }
  },
}
