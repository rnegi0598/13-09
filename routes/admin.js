const express=require('express');
const {getProducts,getAddProduct,postAddProduct,getEditroduct,postEditProduct,postDeleteProduct} =require('../controllers/admin')

const router=express.Router();


router.get('/products',getProducts)

router.get('/add-product',getAddProduct);

router.post('/add-product',postAddProduct);


router.get('/edit-product/:productId',getEditroduct);

router.post('/edit-product',postEditProduct);

router.post('/delete-product',postDeleteProduct);


module.exports=router;