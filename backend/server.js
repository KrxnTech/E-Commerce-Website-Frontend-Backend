const express = require('express')
const cors = require('cors')
require('dotenv').config({ path: './config/dbConfig.env' })
require('./models/db');


const app = express()
app.use(express.json())
app.use(cors())

// ROUTES
const testRoute = require('./routes/testRoute')
const productRoute = require('./routes/productRoutes')
const cartRoute = require('./routes/cartRoutes')
const orderRoute = require('./routes/orderRoutes')

app.use('/api/test', testRoute)
app.use('/api/products', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/orders', orderRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
