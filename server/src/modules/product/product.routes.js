const express = require("express");
const router = express.Router();
const productController = require("./product.controller");
const {authMiddleware, authorizeRoles} = require("../../middlewares/auth.middleware");

router.use(authMiddleware);//common middle ware 

//user APIs
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProduct);

//admin APIs
router.post("/",authorizeRoles('admin'), productController.createProduct);
router.put("/:id",authorizeRoles('admin'), productController.updateProduct);
router.delete("/:id",authorizeRoles('admin'), productController.deleteProduct);

module.exports = router;
