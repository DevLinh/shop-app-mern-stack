const express = require('express');
const router = express.Router();
const path = require('path');

const multer = require('multer')
const { auth } = require("../middleware/auth");
const { Product } = require('../models/Product');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'))
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

//=================================
//             Product
//=================================
router.post('/uploadImage', auth, (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: req.file.filename })
    })
})

router.post('/uploadProduct', auth, (req, res) => {
    //save all the data we got from client into the db
    const product = new Product(req.body)

    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

router.post('/getProducts', (req, res) => {
    let order = req.body.order ? req.body.order : "asc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 50;
    let skip = parseInt(req.body.skip);

    //now we get filter conditions and modify this funciton
    //filters have 2 type: continents and price but right now we only need continents
    let findArgs = {}
    console.log(req.body.filters)
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'continents') {
                findArgs[key] = req.body.filters[key];
            }
        }
    }


    Product.find(findArgs)
        .populate("writer")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, products) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, products, postSize: products.length })
        })
})

module.exports = router;
