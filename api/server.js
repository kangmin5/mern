const express = require('express')
const connectDB = require('./config/db')

const app = express()
connectDB();

app.get('/', async(req, res,next) => {
    const Product = require("./model/ProductModel")
    try {
        const product = new Product
        product.name = "New Product name"
        const productSaved = await product.save()
        console.log(productSaved === product)

        const products = await Product.find()
        console.log(products.length)
        res.send("Product created "  +  product._id + " successfully")
    } catch (err) {
        next(err)
    }
});

app.use(express.json({
    extended : false,
}))

app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`Server starts on port ${PORT}`));