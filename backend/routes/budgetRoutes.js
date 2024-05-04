// Author -
// Jaskaran Singh
const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budgetController");
const userAuth = require("./../middleware/auth")

router.post("/add", userAuth, budgetController.addBudgetData);
router.get("/all", userAuth, budgetController.getAllBudgetData);
router.delete("/:id", userAuth, budgetController.deleteBudgetDataById);
router.put("/:id", userAuth, budgetController.updateBudgetDataById); 

module.exports = router;
