const Cart = require('../models/Cart');

// ✅ Add to Cart
const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  try {
    if (!bookId) {
      return res.status(400).json({ success: false, message: "Book ID is required" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ bookId }] });
    } else {
      const index = cart.items.findIndex(item => item.bookId.toString() === bookId);
      if (index > -1) {
        cart.items[index].quantity += 1;
      } else {
        cart.items.push({ bookId });
      }
    }

    await cart.save();
    return res.status(200).json({ success: true, message: "Book added to cart" });
  } catch (err) {
    console.error("Add to Cart Error:", err.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get Cart Items for User
const getUserCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.bookId");

    if (!cart) {
      return res.status(200).json({ success: true, cart: { items: [] } });
    }

    return res.status(200).json({ success: true, cart });
  } catch (err) {
    console.error("Get Cart Error:", err.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  addToCart,
  getUserCart,
};
