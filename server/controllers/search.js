import User from '../models/User.js';

export const search = async (req, res) => {
  const { q } = req.query; // assuming `q` is your search query parameter

  // implement search logic here, example:
  const users = await User.find({ username: { $regex: q, $options: 'i' } });

  res.status(200).json(users);
};