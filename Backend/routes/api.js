require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = process.env.MONGODB_URI;
const mysql = require('./Mysql');
const product = require('../models/products');
const jwt = require('jsonwebtoken');

mongoose.connect(db).then(()=>{
    console.log("Connected To MongoDB");
}).catch((error)=>{
    console.log("An Error Occured While Connect To MongoDB",error);
})

router.get('/access',Access);
router.get('/cartitems/:userId',AccessCart);
router.post('/cart',Cart);
router.post('/deleteitem',DeleteCartItem);
router.post('/orderdata',OrderData);
router.post('/login',LogIn);
router.post('/userdata',NewUserData);

async function LogIn(req,res)
{
    const { username, password } = req.body;

    // Check if user exists
    const query = 'SELECT * FROM Users WHERE username = ?';
    const values = [username];
  
    mysql.query(query, values, async (err, results) => {
      if (err) {
        console.error('Error logging in: ', err);
        return res.status(500).send('Internal Server Error');
      }
      if (results.length === 0) {
        return res.status(404).send('User not found');
      }
  
      // Compare hashed password
      const isMatch = await bcrypt.compare(password, results[0].password);
      if (!isMatch) {
        return res.status(401).send('Incorrect password');
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: results[0].id, username: results[0].username }, 'secretkey');
      res.status(200).send({ auth: true, token: token, userId: results[0].id });
    });
}

async function NewUserData(req,res)
{
    const { username, password } = req.body;

    console.log(username,password);

    // Hash the password
    
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Insert user into database
    const query = 'INSERT INTO Users (username, password) VALUES (?, ?)';
    const values = [username, hashedPassword];
  
    mysql.query(query, values, (err, result) => {
      if (err) {
        console.error('Error registering user: ', err);
        return res.status(500).send('Internal Server Error');
      }
      // Generate JWT token
      const token = jwt.sign({ id: result.insertId, username: username }, 'secretkey');
      res.status(201).send({ auth: true, token: token, userId: result.insertId });
    });
}

async function Access(req,res)
{  
    try 
    {
       const data = await product.find({});
       //console.log(data);

       res.status(200).json(data);
    }
    catch(error) 
    {
        console.log("Error Occured While Accessing The Data",error);
        res.status(500).json('An Error Occured While Sending Data');
    }
}

async function Cart(req,res)
{
    const { userId, productId } = req.body;

    mysql.query('SELECT cart FROM Users WHERE id = ?', [userId], (err, results) => {
      if (err) return res.status(500).send('Error querying database');
      
      let cart = results[0].cart ? JSON.parse(results[0].cart) : [];
      if (!cart.includes(productId)) {
        cart.push(productId);
      }
  
      mysql.query('UPDATE Users SET cart = ? WHERE id = ?', [JSON.stringify(cart), userId], (err) => {
        if (err) return res.status(500).send('Error updating cart');
        res.status(200).send(true);
      });
    });
}

async function AccessCart(req,res)
{
    const { userId } = req.params;

    mysql.query('SELECT cart FROM Users WHERE id = ?', [userId], async (err, results) => {
      if (err) return res.status(500).json({ error: 'Error querying database' });
      if (results.length === 0) return res.status(404).json({ error: 'User not found' });
  
      const cart = results[0].cart ? JSON.parse(results[0].cart) : [];

      const products = await product.find({ _id: { $in: cart } });
      
      res.status(200).json(products);
    });
}

async function OrderData(req,res)
{
  const { userId, productIds, totalAmount } = req.body;

  const sql = 'INSERT INTO orders (userId, productIds, totalAmount) VALUES (?, ?, ?)';
  const values = [userId, JSON.stringify(productIds), totalAmount];

  mysql.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error creating order:', err);
      res.status(500).json({ error: 'Failed to create order' });
      return;
    }
    console.log('Order created successfully');
    res.status(201).json({ orderId: result.insertId });
  });
}

async function DeleteCartItem(req,res) 
{
    const { userId, productId } = req.body;
  
    // Retrieve current cart from MySQL
    mysql.query('SELECT cart FROM Users WHERE id = ?', [userId], async (err, results) => {
      if (err) {
        console.error('Error querying MySQL:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (!results || results.length === 0 || !results[0].cart) {
        return res.status(404).json({ error: 'User not found or cart is empty' });
      }
  
      const cart = JSON.parse(results[0].cart);
  
      // Remove productId from cart
      const updatedCart = cart.filter(id => id !== productId);
  
      // Update MySQL Users table with updated cart
      mysql.query('UPDATE Users SET cart = ? WHERE id = ?', [JSON.stringify(updatedCart), userId], async (err) => {
        if (err) {
          console.error('Error updating MySQL:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        // Fetch products from MongoDB based on updated cart

        const products = await product.find({ _id: { $in: updatedCart } });
        res.status(200).json(products);
      });
    });
}

module.exports = router;
