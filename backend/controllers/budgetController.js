// Author -
// Jaskaran Singh
const Budget = require("../models/budgetModel");

const addBudgetData = async (req, res) => {
  try {
    console.log("hi");
    const userId = req.user.userId;
    console.log(req.body);
    const id = req.body.newData.id;
    const value = req.body.newData.value;
    const label = req.body.newData.label;

    const budgetData = new Budget({ id: id, value:value, label:label, userId:userId });
    console.log(budgetData);
    await budgetData.save();
    res.status(201).json({ success: true, message: "Budget data added successfully" });
  } catch (error) {
    console.error("Error adding budget data:", error);
    res.status(500).json({ success: false, message: "Failed to add budget data" });
  }
};

const getAllBudgetData = async (req, res) => {
  const userId = req.user.userId;
  try {
    const ObjectId = require('mongoose').Types.ObjectId;
    const budgetData = await Budget.find({ userId: new ObjectId(userId) });
    res.status(200).json({ success: true, budgetData });
  } catch (error) {
    console.error("Error fetching budget data:", error);
    res.status(500).json({ success: false, message: "Failed to fetch budget data" });
  }
};

const deleteBudgetDataById = async (req, res) => {
  try {
    const { id } = req.params;
    await Budget.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Budget data deleted successfully" });
  } catch (error) {
    console.error("Error deleting budget data:", error);
    res.status(500).json({ success: false, message: "Failed to delete budget data" });
  }
};

const updateBudgetDataById = async (req, res) => {
    try {
      const { id } = req.params;
      const { newData } = req.body;
  
      console.log(req.body);
      await Budget.findByIdAndUpdate(id, newData);
  
      res.status(200).json({ success: true, message: "Budget data updated successfully" });
    } catch (error) {
      console.error("Error updating budget data:", error);
      res.status(500).json({ success: false, message: "Failed to update budget data" });
    }
  };


module.exports = { addBudgetData, getAllBudgetData, deleteBudgetDataById, updateBudgetDataById  };
