const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAllUsers = catchError(async (req, res) => {
  const users = await User.findAll();
  return res.json(users);
});

const createUser = catchError(async (req, res) => {
  const { first_name, last_name, email, password, birthday } = req.body;
  const user = await User.create({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    birthday: birthday
  });
  return res.status(201).json(user)
});

const getOneUser = catchError(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if(!user)  res.json({message:"user not found"});
  return res.json(user);
});

const removeUser = catchError(async (req, res) => {
  const { id } = req.params;
  const remove = await User.destroy({ where: { id } });
  if(remove === 0) return res.json({message:"user not found"})
  return res.sendStatus(204);
});

const updateUser = catchError(async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, password, birthday } = req.body;
  const user = await User.update(
    {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      birthday: birthday
    },
    { where: { id }, returning: true }
  );

  if(user[0]===0) res.json({message:"user not found"})
  return res.json(user[1][0]);
});


module.exports = {
  getAllUsers,
  createUser,
  getOneUser,
  removeUser,
  updateUser
}