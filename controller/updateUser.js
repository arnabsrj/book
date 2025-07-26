const UserModel = require('../models/UserModel');

async function updateUser(req, res) {
  try {
    const sessionUser = req.userId;

    if (!sessionUser) {
      return res.status(401).json({
        message: 'Unauthorized. Please log in.',
        success: false,
      });
    }

    const { email, name, role, _id } = req.body;

    const adminUser = await UserModel.findById(sessionUser);
    if (!adminUser || adminUser.role !== 'ADMIN') {
      return res.status(403).json({
        message: 'Access denied. Only admins can update users.',
        success: false,
      });
    }

    const payload = {};
    if (email) payload.email = email;
    if (name) payload.name = name;
    if (role) payload.role = role;

    // Preserve your logic: use email or _id as filter
    const filter = email ? { email } : { _id };

    // Use findOneAndUpdate (since filter is an object)
    const updatedUser = await UserModel.findOneAndUpdate(filter, payload, { new: true });

    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found.',
        success: false,
      });
    }

    res.json({
      data: updatedUser,
      message: 'User updated successfully.',
      success: true,
    });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({
      message: 'Internal server error.',
      success: false,
    });
  }
}

module.exports = updateUser;
