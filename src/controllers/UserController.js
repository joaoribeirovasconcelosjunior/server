// os controles que lida com as req e res
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 4;
const jwtSecret = 'SECRET';


const User = require('../models/User');

module.exports = {
  async index(req, res) {
    try {
      const allUserss = await User.findAll();
      return res.json(allUserss);
    } catch (err) {
      return res.status(400).json({ erro: err });
    }
  },

  async login(req, res) {
    try {
      const { password, email } = req.body;
      const user = await User.findAll({
        where: {
          email,
        },
      });

      /* essa verificação não é muito interessante mais é a que eu sei fazer */

      if (user !== '') {
        const hashPassword = user.map((i) => {
          return i.password;
        });
        const hasPASS = hashPassword.toString();

        const userID = user.map((i) => {
          return i.id;
        });
        const ID = userID.toString();
        console.log(ID);


        if (await bcrypt.compare(password, hasPASS)) {
          const token = jwt.sign({ ID }, jwtSecret, {
            expiresIn: 200,
          });
          return res.status(200).json({ jwt: token });
        }
        return res.status(400).json({ erro: 'password/username incorrect!' });
      }

      return res.status(400).json({ erro: 'User is NOT registered!' });
    } catch (err) {
      return res.status(400).json({ erro: err });
    }
  },

  async register(req, res) {
    try {
      const { name, password, email } = req.body;

      const user = await User.findAll(
        {
          where: {
            email,
          },
        },
      );

      /* essa verificação não é muito interessante mais é a que eu sei fazer */
      if (user == '') {
        await User.create({
          name,
          password: await bcrypt.hash(password, saltRounds),
          email,
        });
        const token = jwt.sign({ name }, jwtSecret);
        return res.status(200).json({ sucess: 'create user', jwt: token });
      }
      return res.status(400).json({ erro: 'User already registered!' });
    } catch (err) {
      return res.status(400).json({ erro: err });
    }
  },
};
