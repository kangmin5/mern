const express = require('express')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())

const apiRoutes = require('./routes/apiRoutes')

app.get('/', async(req, res,next) => {
    res.json({message: "API running..."})
});

const connectDB = require('./config/db')
connectDB();

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

const PORT = process.env.PORT || 5001;

app.listen(PORT,()=> console.log(`Server starts on port ${PORT}`));