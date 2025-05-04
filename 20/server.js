const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/employeesDB').then(() => console.log("MongoDB connected"));

const employeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  designation: String,
  salary: Number,
  joiningDate: Date
});

const Employee = mongoose.model('Employee', employeeSchema);

app.get('/add/:name/:department/:designation/:salary/:joiningDate', async (req, res) => {
  const { name, department, designation, salary, joiningDate } = req.params;
  try {
    const emp = new Employee({
      name,
      department,
      designation,
      salary,
      joiningDate: new Date(joiningDate)
    });
    await emp.save();
    res.send('Employee added successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/update/:name', async (req, res) => {
    try {
      const emp = await Employee.findOne({ name: req.params.name });
  
      emp.name = "abc";
      emp.department = "xyz";
      emp.designation = "SDE";
      emp.salary = 12345;
      emp.joiningDate = new Date("2022-01-01");
  
      await emp.save();
      res.send('Employee updated.');
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  

app.get('/delete/:name', async (req, res) => {
  try {
    const result = await Employee.deleteOne({ name: req.params.name });
    res.send('Employee deleted successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
