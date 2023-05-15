import User from "../models/User.js";


export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err){  
        res.status(404).json({ message: err.message})
    }
}

export const getUserFollowing = async (req, res) => {
    try {
        const { id } = req.params;
    const user = await User.findById(id);

    const following = await Promise.all(
        user.following.map((id) => User.findById(id))
    );

    const formattedFollowing = following.map(
        ({_id, username, trades}) => {
            return {_id, username, trades};
        }
        
    );
    res.status(200).json(formattedFollowing);
    } catch(err){
        res.status(404).json({ message: err.message})
    }
}

export const followUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.userId);
      if (!user.followers.includes(req.userId)) {
        await user.updateOne({ $push: { followers: req.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  export const unfollowUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.userId);
      if (user.followers.includes(req.userId)) {
        await user.updateOne({ $pull: { followers: req.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you don't follow this user");
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };