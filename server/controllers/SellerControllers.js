const Seller = require("../models/Seller");
const Books = require("../models/Books");
const Users = require("../models/Users");

/* ===========================
   SELLER REGISTER
=========================== */

exports.register = async (req, res) => {

  try {

    await Seller.create({

      ...req.body,

      status: "Pending"

    });

    res.json({

      msg: "Seller Registered"

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      msg: "Signup Failed"

    });

  }

};

/* ===========================
   SELLER LOGIN
=========================== */

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const seller = await Seller.findOne({

      email

    });

    if (!seller) {

      return res.status(401).json({

        msg: "Seller Not Found"

      });

    }

    if (seller.password !== password) {

      return res.status(401).json({

        msg: "Wrong Password"

      });

    }

    if (seller.status === "Blocked") {

      return res.status(403).json({

        msg: "Seller Blocked"

      });

    }

    res.json({

      token: "seller_token",

      seller

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      msg: "Login Failed"

    });

  }

};

/* ===========================
   ADD BOOK
=========================== */

exports.addBook = async (req, res) => {

  try {

    const image = req.file ? req.file.filename : "";

    await Books.create({

      title: req.body.title,

      author: req.body.author,

      genre: req.body.genre,

      description: req.body.description,

      price: req.body.price,

      stock: req.body.stock,

      image,

      sellerId: req.body.sellerId,

      sellerName: req.body.sellerName

    });

    res.json({

      msg: "Book Added"

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      msg: "Add Failed"

    });

  }

};

/* ===========================
   DELETE BOOK
=========================== */

exports.deleteBook = async (req, res) => {

  try {

    await Books.findByIdAndDelete(req.params.id);

    res.json({

      msg: "Deleted"

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      msg: "Delete Failed"

    });

  }

};

/* ===========================
   SELLER DASHBOARD
=========================== */

exports.dashboard = async (req, res) => {

  try {

    const books = await Books.find({

      sellerId: req.params.id

    });

    const users = await Users.find();

    let totalOrders = 0;

    users.forEach(user => {

      if (user.orders) {

        user.orders.forEach(order => {

          if (order.sellerId === req.params.id) {

            totalOrders++;

          }

        });

      }

    });

    res.json({

      books: books.length,

      orders: totalOrders

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      msg: "Dashboard Error"

    });

  }

};