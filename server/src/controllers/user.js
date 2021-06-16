const User = require('../models/user');

const userCtrl = {};
//listar todos los usuarios
userCtrl.getUsers = async (req, res) => {
  const userList = await User.find();

  if (!userList) {
    res.status(500).json({ success: false })
  }
  res.send(userList);
}

//detalle de 1 usuario
userCtrl.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(500).json({ message: 'The user with the given ID was not found.' })
  }
  res.status(200).send(user);
}

//crear un usuario
userCtrl.createUser = async (req, res) => {
  const userExist = User.find(
    { $or: [{ email: req.body.email }, { cedula: req.body.cedula }] },
    function (err, docs) {
      if (docs.length) {
        return res.status(500).send('The email or DNI exists!')
      } else {
        const regex = /^[0-9]*$/;
        const onlyNumbersDni = regex.test(req.body.cedula);
        const onlyNumbersPhone = regex.test(req.body.telefono);
        if (!onlyNumbersDni || !onlyNumbersPhone) {
          return res.status(400).send('DNI or phone they can only be numbers!')
        }

        if (req.body.nombre === '' ||
          req.body.apellido === '' ||
          req.body.cedula === '' ||
          req.body.email === ''
        ) {
          return res.status(400).send('Invalid fields!')
        }

        let user = new User({
          nombre: req.body.nombre,
          email: req.body.email,
          apellido: req.body.apellido,
          cedula: req.body.cedula,
          telefono: req.body.telefono
        })
        user = user.save();

        if (!user)
          return res.status(400).send('the user cannot be created!')

        res.send(user);
      }
    }
  );

}

//editar un usuario
userCtrl.editUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      nombre: req.body.nombre,
      email: req.body.email,
      apellido: req.body.apellido,
      cedula: req.body.cedula,
      telefono: req.body.telefono,
    },
    { new: true }
  )

  if (!user)
    return res.status(400).send('The user cannot be edited!')

  res.send(user);
}

//eliminar
userCtrl.deleteUser = async (req, res) => {
  User.findByIdAndRemove(req.params.id).then(user => {
    if (user) {
      return res.status(200).json({ success: true, message: 'the user is deleted!' })
    } else {
      return res.status(404).json({ success: false, message: "user not found!" })
    }
  }).catch(err => {
    return res.status(500).json({ success: false, error: err })
  })
}

module.exports = userCtrl;