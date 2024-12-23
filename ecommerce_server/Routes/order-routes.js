const express=require('express');
const orders=require('../models/Orders');
const products = require("../models/Products");

const router=express.Router();

router.get('/orders', async (req, res) => {
    try {
        const ans = await orders.find();
        res.status(200).send(ans);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send({ error: 'An error occurred while fetching orders' });
    }
});

router.get('/orders/:email', async (req, res) => {
    try {
        const ordersList = await orders.find({ Email: req.params.email });
        res.status(200).send(ordersList);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).send({ error: "Failed to fetch orders" });
    }
});

router.post('/order/add', async (req, res) => {
    try {
        const { email, items, address, paymentMethod, totalAmount, orderDate } = req.body;

        if (!email || !items || items.length === 0 || !paymentMethod || !totalAmount) {
            return res.status(400).json({ success: false, message: 'Missing required fields.' });
        }

        for (const itemNo of items) {
            const result = await products.updateOne(
                { No: itemNo, Stock: { $gt: 0 } },
                { $inc: { Stock: -1 } }
            );
            
            
            if (result.matchedCount === 0) {
                return res.status(404).json({ success: false, message: `Product with No ${itemNo} not found or out of stock.` });
            }

        }

        const newOrder = new orders({
            Email: email,
            No: await orders.countDocuments() + 1,
            Items: items,
            PaymentMethod: paymentMethod,
            TotalAmount: totalAmount,
            OrderDate: orderDate
        });

        await newOrder.save();
        res.status(201).json({ success: true, message: 'Order placed successfully.', order: newOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ success: false, message: 'Failed to place order.' });
    }
});

module.exports=router;