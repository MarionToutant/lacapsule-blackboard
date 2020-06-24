var express = require('express');
var router = express.Router();
var ArticleModel = require('../models/articles');
var OrderModel = require('../models/orders');
var UserModel = require('../models/users');
const dotenv = require('dotenv');
dotenv.config();

/* GET home page. */
router.get('/', async function (req, res, next) {
  var noArticle = await ArticleModel.find({ stock: 0 });
  var admin = await UserModel.findById(`${process.env.ADMIN_ID}`);
  res.render('index', { noArticle, admin });
});

/* GET tasks page. */
router.get('/tasks-page', async function (req, res, next) {
  var admin = await UserModel.findById(`${process.env.ADMIN_ID}`);
  res.render('tasks', { admin });
});

/* GET Messages page. */
router.get('/messages-page', async function (req, res, next) {
  var admin = await UserModel.findById(`${process.env.ADMIN_ID}`);
  res.render('messages', { admin });
});

/* GET Users page. */
router.get('/users-page', async function (req, res, next) {
  var clients = await UserModel.find({ status: "customer" });
  res.render('users', { clients });
});

/* GET Catalog page. */
router.get('/catalog-page', async function (req, res, next) {
  var articles = await ArticleModel.find();
  res.render('catalog', { articles });
});

/* GET Orders-list page. */
router.get('/orders-list-page', async function (req, res, next) {
  var orders = await OrderModel.find();
  res.render('orders-list', { orders });
});

/* GET Order detail page. */
router.get('/order-page', async function (req, res, next) {
  var order = await OrderModel.findById(req.query.order_id).populate('articles').exec();
  res.render('order', { order });
});

/* GET chart page. */
router.get('/charts', async function (req, res, next) {

  var clients = await UserModel.find({ status: "customer" });
  var numMale = 0;
  var numFemale = 0;
  for (var i = 0; i < clients.length; i++) {
    if (clients[i].gender == "female") {
      numFemale ++;
    } else if (clients[i].gender == "male") {
      numMale ++;
    }
  }

  var admin = await UserModel.findById(`${process.env.ADMIN_ID}`);
  var messRead = 0;
  var messNotRead = 0;
  for (var i = 0; i < admin.messages.length; i++) {
    if (admin.messages[i].read == true) {
      messRead ++;
    } else if (admin.messages[i].read == false) {
      messNotRead ++;
    }
  }

  var ordersPaid = await OrderModel.find({ status_payment: "validated" });
  var ordersShipped = 0;
  var ordersNotShipped = 0;
  for (var i = 0; i < ordersPaid.length; i++) {
    if (ordersPaid[i].status_shipment == true) {
      ordersShipped += 1;
    } else if (ordersPaid[i].status_shipment == false) {
      ordersNotShipped += 1;
    }
  }

  var ordersAggregate = OrderModel.aggregate();
  ordersAggregate.match({ "status_payment": "validated" });
  ordersAggregate.group({ _id: {month: { $month: "$date_payment" }, year: {$year: "$date_payment"}}, ca: { $sum: "$total" }, ordercount: { $sum: 1 } });
  ordersAggregate.sort({ _id: 1});
  var orderData = await ordersAggregate.exec();

  res.render('charts', { numFemale, numMale, messRead, messNotRead, ordersShipped, ordersNotShipped, orderData });
});



module.exports = router;
