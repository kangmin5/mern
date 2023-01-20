const express = require('express')
const connectDB = require('./config/db')
const apiRoutes = require('./routes/apiRoutes')


const app = express()
connectDB();

app.get('/', async(req, res,next) => {
    res.json({message: "API running..."})
});

app.use(express.json({
    extended : false,
}))

app.use("/api", apiRoutes)

// app.use('/api/user', require('./routes/api/user'));
// app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/posts', require('./routes/api/posts'));
// app.use('/api/profile', require('./routes/api/profile'));


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`Server starts on port ${PORT}`));