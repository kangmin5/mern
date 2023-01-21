const express = require('express')
const connectDB = require('./config/db')
const apiRoutes = require('./routes/apiRoutes')


const app = express()
connectDB();

app.get('/', async(req, res,next) => {
    res.json({message: "API running..."})
});

app.use(express.json({

}))

app.use("/api", apiRoutes)

app.use((error, req, res, next) => {
    console.error(error)
    next(error)
})

app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message,
        stack: error.stack,
    })
})


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`Server starts on port ${PORT}`));