const db = require('../models/db') // REQUIR DATABASE FROM MODELS FOLDER


// GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
    try {

        // FETCH ALL PRODUCT FROM DATABASE
        const [rows] = await db.query('SELECT * FROM products')
        res.json(rows) // SEND AS RES IN JSON FORM

    } catch (err) {

        console.log(err)
        res.status(500).json({ message: 'Error Fetching Product' })
    }
}

// GET PRODUCTS BY ID 
exports.getProductById = async (req, res) => {
    try {

        // FETCH BY TAKING ID 
        let Productid = req.params.id
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [Productid])

        // ERROR HANDLING 
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' })
        }

        // SEND RESPONCE IN JSON 
        res.json(rows[0])

    } catch (err) {

        console.log(err)
        res.status(500).json({ message: 'Error Fetching Product' })
    }
}


// CREATE NEW PRODUCT 
exports.createProduct = async (req, res) => {
    try {

        const { name, description, price, stock, image, category_id } = req.body // TAKE THE VALUES FROM REQUEST BODY
        const query = 'INSERT INTO products ( name, description, price, stock, image, category_id ) VALUES (? , ? , ? , ? , ? , ?) '
        await db.query(query, [name, description, price, stock, image, category_id])
        res.json({message: 'Product Created Successfully !'})

    } catch (err) {

        console.log(err)
        res.status(500).json({ message: 'Error Creating Products' })
    }
}

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
    try {

        const { name, description, price, stock, image, category_id } = req.body
        const query = 'UPDATE products SET name=? , description=? , price=? , stock=? , image=? , category_id=? WHERE id=?'
        await db.query(query, [name, description, price, stock, image, category_id, req.params.id])
        res.json({ message: 'Product Updated Successfully' })

    } catch (err) {

        console.log(err)
        res.status(500).json({ message: 'Error updating Products' })
    }
}

// DELETE PRODUCTS
exports.deleteProduct = async (req, res) => {
    try {

        await db.query('DELETE FROM products WHERE id = ?', [req.params.id])
        res.json({ message: 'Products Deleted Successfully !' })

    } catch (err) {

        console.log(err)
        res.status(500).json({ message: 'Error Deleting Product' })
    }
}
