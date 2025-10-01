const express = require("express");
const router = express.Router();
const productController = require("./product.controller");
const {authMiddleware, authorizeRoles} = require("../../middlewares/auth.middleware");

// router.use(authMiddleware);//common middle ware 

router.get("/", productController.getAllProducts);
router.get("/search", productController.searchProducts);
router.get("/suggestions", productController.getSearchSuggestions);
router.get("/:id", productController.getProduct);

router.post("/", authMiddleware, authorizeRoles('admin'), productController.createProduct);
router.put("/:id", authMiddleware, authorizeRoles('admin'), productController.updateProduct);
router.delete("/:id", authMiddleware, authorizeRoles('admin'), productController.deleteProduct);


module.exports = router;
