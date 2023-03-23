const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errhandler');
const catchAsyncErr = require('../middleware/catchAsyncErr');
const apiFeatures = require('../utils/apifeatures.js');

// create product
exports.createProduct = catchAsyncErr(async (req, res, next) => {
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

// get all products
exports.getAllProducts = catchAsyncErr(async (req, res, next) => {
    const resultPerPage = 16;
    const productCount = await Product.countDocuments();

    const apiFeature = new apiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
        productCount
    });
});

// get trending products
exports.getTrendingProducts = catchAsyncErr(async (req, res) => {
    const resultPerPage = 8;

    const apiFeature = new apiFeatures(Product.find({ trending: true }), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;
    let productCount = 0;
    productCount = products.length;

    res.status(200).json({
        success: true,
        products,
        productCount
    });
});

//update product
exports.updateProduct = catchAsyncErr(async (req, res, next) => {
    let product = Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not Found", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        product
    });
});

//delete product
exports.deleteProducts = catchAsyncErr(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not Found", 404));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product Deleted'
    });
});

//get single product
exports.getSingleProduct = catchAsyncErr(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not Found", 404));
    }

    res.status(200).json({
        success: true,
        product
    });
});

//create review or update the review
exports.createProductReview = catchAsyncErr(
    async (req, res, next) => {

        const { rating, comment, productId } = req.body;

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        };

        const product = await Product.findById(productId);

        const isReviewed = product.reviews.find(
            (review) => {
                review.user.toString() === req.user._id.toString();
            }
        );

        if (isReviewed) {
            product.reviews.forEach(
                (review) => {
                    if (review.user.toString() === req.user._id.toString()) {
                        review.rating = rating;
                        review.comment = comment;
                    }
                }
            );
        }
        else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }

        let avg = 0;

        product.reviews.forEach(
            (review) => {
                avg += review.rating;
            }
        );

        product.ratings = avg / product.reviews.length;

        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            review
        })
    }
);

//get all reviews of a product
exports.getProductReviews = catchAsyncErr(
    async (req, res, next) => {
        const product = await Product.findById(req.query.productId);

        if (!product) {
            return next(new ErrorHandler("Product not Found", 404));
        }

        res.status(200).json({
            success: true,
            reviews: product.reviews,
            numberOfReviews: product.reviews.length
        });
    }
);

//delete review
exports.deleteReview = catchAsyncErr(
    async (req, res, next) => {
        const product = await Product.findById(req.query.productId);

        if (!product) {
            return next(new ErrorHandler("Product not Found", 404));
        }

        const reviews = product.reviews.filter(
            (review) => {
                return review._id.toString() !== req.query.id.toString();
            }
        );

        product.reviews = reviews;

        let avg = 0;

        product.reviews.forEach(
            (review) => {
                avg += review.rating;
            }
        );

        product.ratings = avg / product.reviews.length;

        product.numOfReviews = product.reviews.length;

        await product.save({ validateBeforeSave: false, new: true });

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully'
        });
    }
);