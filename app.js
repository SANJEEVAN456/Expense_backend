const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://sanju92005_db_user:teAWJlMyEo6pLnda@cluster0.s9oia3a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(() => console.log("MongoDB Atlas connected"))
.catch(err => console.log("MongoDB connection error",err));

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true}
});

const Expense = mongoose.model("expense", expenseSchema);
app.post('/addExpense',insertExpense);
async function insertExpense(req,res){
  try{
    const newExpense = new Expense(req.body)
    await newExpense.save()
    res.send("expense added")
  } catch(error){
    res.send("Error in adding response")
  }
}
app.get('/getAlldata',getExpense);
async function getExpense(req,res) {
  try{
    const alldata =await Expense.find()
    res.json(alldata)
  } catch(error){
    res.status(500).json({ error: err.message });
  }
}
app.delete('/deleteExpense',deleteExpense)
async function deleteExpense(req,res) {
  try{
    const {id} = req.body;
    await Expense.findByIdAndDelete(id);
    res.send("Expense deleted")
  }  catch(error){
    res.status(500).json({ error: err.message });
  }
}
app.put('/editExpense',editExpense);
async function editExpense(req,res) {
  try{
    const {id,title,amount}= req.body;
    const result=await Expense.findByIdAndUpdate(id,{title,amount},{new:true})
    res.send("Expense updated")
  } catch(error){
    res.status(500).json({ error: err.message });
  }
}
app.listen(3000)
