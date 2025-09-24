const Rating = require('../../models/Rating');
const Product = require('../../models/Product');
const Order = require('../../models/Order');

const updateProductRating = async(productId) => {
    const ratings = await Rating.find({productId});

    const numReviews = ratings.length;
    const averageRating = numReviews===0?0:(ratings.reduce((acc,r)=>acc+r.rating,0)/numReviews);

    await Product.findByIdAndUpdate(productId,{
        numReviews,
        averageRating
    })
}

exports.createOrUpdateRating = async(req,res) =>{
    try {
        const { productId, comment, rating } = req.body;
        const userId = res.user.id;

        const hasOrdered = await Order.finOne({
            user:  userId,
            'products.productId': productId
        })
        // “Find an order by this user where the products array contains at least one object whose product equals productId.”
        // Internally it doing :
        // for (let item of items) {
        //     if (item.product === productId) {
        //       // Match found
        //     }
        //   }
          
        if(!hasOrdered){
            return res.status(403).json({ message: 'You did not buyed this product'});
        }

        let existingRating = await Rating.findOne({productId,userId});
        if(existingRating){
            existingRating.rating = rating;
            existingRating.comment = comment;
            await existingRating.save();
        }else{
            await Rating.create({productId,userId,rating,comment})
        }
        await updateProductRating(productId);

        res.status(200).json({message: 'Ratings submitted sucessfully'});

    } catch(err){
        res.status(500).json({message: "Server Error",error:err.message});
    }
}

exports.deleteRating = async (req,res) => {
    try{
        const {productId} = req.params;
        const userId = req.user.id;
        const rating = await Rating.findOneAndDelete({userId,productId});

        if (!rating){
            res.status(404).json({mesage: 'rating not found'});
        }

        await updateProductRating(productId);
        res.status(200).json({ message: 'Rating deleted' });
    } catch(err){
        res.status(500).json({message: "Server Error",error:err.message});
    }
}

exports.getProductRatings = async (req,res) => {
      try {
    const { productId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const ratings = await Rating.find({ product: productId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Rating.countDocuments({ product: productId });

    res.status(200).json({
      ratings,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};