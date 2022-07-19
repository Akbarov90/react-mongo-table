const router = require("express").Router()
const {Products} = require("../models/Product");

// Products add
router.post("/add", (req, res) => {
    console.log(req.body)
    const products = new Products(req.body);
    products.save((err) => {
        if (err) return res.status(400).json({success: false, err});
        return res.status(200).json({success: true});
    })
})


// Products get
router.get("/", (req, res) => {
    Products.find().exec((err, products) => {
        if (err) return res.status(400).json({success: false, err});
        return res.status(200).json({success: true, products: products})
    })
})

module.exports = router;