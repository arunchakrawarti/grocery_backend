const User = require('../models/usermodel');

const updateCart = async (req, res) => {
  try {
    const userId = req.user;
    const { cartItems } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { cartItems } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.json({ msg: "Cart updated successfully", updatedUser, success: true });
  } catch (error) {
    res.status(500).json({ msg: "Error updating cart", success: false, error: error.message });
  }
};

module.exports = {
  updateCart
};
