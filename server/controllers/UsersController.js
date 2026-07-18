const Users = require("../models/Users");
const Books = require("../models/Books");

/* ==========================
   USER REGISTER
========================== */

exports.register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const exists = await Users.findOne({ email });

    if (exists) {

      return res.status(400).json({
        msg: "User Already Exists"
      });

    }

    await Users.create({

      name,

      email,

      password,

      status: "Active",

      orders: [],

      wishlist: []

    });

    res.json({
      msg: "Registered Successfully"
    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Signup Failed"
    });

  }

};


/* ==========================
   USER LOGIN
========================== */

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {

      return res.status(401).json({
        msg: "User Not Found"
      });

    }

    if (user.password !== password) {

      return res.status(401).json({
        msg: "Wrong Password"
      });

    }

    if (user.status === "Blocked") {

      return res.status(403).json({
        msg: "User Blocked"
      });

    }

    res.json({

      token: "user_token",

      user

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Login Failed"
    });

  }

};


/* ==========================
   GET ALL BOOKS
========================== */

exports.books = async (req, res) => {

  try {

    const books = await Books.find();

    res.json(books);

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Cannot Load Books"
    });

  }

};


/* ==========================
   ADD TO WISHLIST
========================== */

exports.addWishlist = async (req, res) => {

  try {

    const user = await Users.findById(req.params.id);

    if (!user) {

      return res.status(404).json({
        msg: "User Not Found"
      });

    }

    if (!user.wishlist) {

      user.wishlist = [];

    }

    const exists = user.wishlist.find(

      item => item.bookId === req.body.bookId

    );

    if (exists) {

      return res.json({
        msg: "Book Already in Wishlist"
      });

    }

    user.wishlist.push({

      bookId: req.body.bookId,

      title: req.body.title,

      author: req.body.author,

      genre: req.body.genre,

      image: req.body.image,

      price: req.body.price,

      sellerName: req.body.sellerName

    });

    await user.save();

    res.json({
      msg: "Book Added to Wishlist"
    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Wishlist Failed"
    });

  }

};


/* ==========================
   GET WISHLIST
========================== */

exports.getWishlist = async (req, res) => {

  try {

    const user = await Users.findById(req.params.id);

    if (!user) {

      return res.status(404).json({
        msg: "User Not Found"
      });

    }

    res.json(user.wishlist || []);

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Cannot Load Wishlist"
    });

  }

};


/* ==========================
   REMOVE FROM WISHLIST
========================== */

exports.removeWishlist = async (req, res) => {

  try {

    const user = await Users.findById(req.params.id);

    if (!user) {

      return res.status(404).json({
        msg: "User Not Found"
      });

    }

    user.wishlist = user.wishlist.filter(

      item => item.bookId !== req.params.bookId

    );

    await user.save();

    res.json({
      msg: "Removed from Wishlist"
    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Remove Failed"
    });

  }

};