const express = require('express');
const { createOrUpdateRating, deleteRating, getProductRatings } = require('./rating.controller');
const router =  express.Router();

const { authMiddleware } = require("../../middlewares/auth.middleware");

//auth routes
router.post('/',authMiddleware,createOrUpdateRating);
router.delete('/:productId',authMiddleware,deleteRating);

//public 
router.get('/:productId',getProductRatings);

module.exports = router;


