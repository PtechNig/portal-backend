const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./router/authRouter')
const userRouter = require('./router/userRouter')
const jobRouter = require('./router/jobRouter')
const contactRouter = require('./router/contactRouter')
const applicationRouter = require('./router/applicationRouter')
const path = require('path');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log('DB Connected Successfully')
}).catch(err => {
    console.log(err.message)
})


// Middleware to parse JSON request bodies
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(cors())
app.use(cors({ origin: 'https://portal-frontend-xz5g.onrender.com' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use('/', authRouter)
app.use('/', userRouter)
app.use('/', jobRouter)
app.use('/', contactRouter)
app.use('/', applicationRouter)

const PORT = process.env.PORT || 5050

// Routes

app.get('/', (req, res) => {
  res.send('Welcome to the API')
})


app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    res.status(err.statusCode).json({
        status : err.status,
        message : err.message
    })

    next();
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  
})