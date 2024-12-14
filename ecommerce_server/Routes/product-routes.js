const express=require('express');
const products=require('../models/Products');

const router=express.Router();

router.get('/products', async (req, res) => {
    const ans = await products.find();
    res.send(ans);
});
router.get("/products/:id", async (req, res) => {
  try {
    const product = await products.find({
      No: req.params.id,
    });
    if (!product || product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch the product", error });
  }
});
router.post('/products', async (req, res) => {
  try {
    const newItem = new products({ ...req.body,No: await products.countDocuments() + 1 });
    await newItem.save();
    res.status(201).json({ message: 'Stock added successfully', product: newItem });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to add product', error: error.message });
  }
});
router.delete('/products/:id', async (req, res) => {
    const productId=parseInt(req.params.id);
    const result = await products.findOneAndDelete({ No: productId });
    if (result) {
      res.json({ message: 'Product deleted successfully!' });
    }
    else {
      res.json({ message: 'Product not found!' });
    }
});
router.post('/products/:id', async (req, res) => {
    const { deletedNo } = req.body;
    await products.updateMany(
      { No: { $gt: deletedNo } },
      { $inc: { No: -1 } }
    );
    const updatedItems = await products.find().sort({ No: 1 });
    res.json(updatedItems);
  });
router.get('/products/stock/:productNo', async (req, res) => {
  try {
      const { productNo } = req.params;
      const product = await products.findOne({ No: productNo });

      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.json({ Stock: product.Stock });
  } catch (error) {
      console.error('Error fetching product stock:', error);
      res.status(500).json({ message: 'Failed to fetch product stock' });
  }
});

module.exports=router;