const express = require("express");
const router= express.Router();

const {authMiddleware} = require("../../middlewares/auth.middleware");
const { getAll, update, remove } = require("./user.controller");


router.get('/', authMiddleware,getAll);
router.post('/update', authMiddleware,update);
router.delete('/:name', authMiddleware,remove);

module.exports = router;