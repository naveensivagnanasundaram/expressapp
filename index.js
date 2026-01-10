const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample customer data
let customers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    city: "New York"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    city: "London"
  }
];

// GET all customers
app.get('/api/customers', (req, res) => {
  res.status(200).json({
    success: true,
    data: customers
  });
});

// GET customer by ID
app.get('/api/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const customer = customers.find(c => c.id === id);

  if (!customer) {
    return res.status(404).json({
      success: false,
      message: "Customer not found"
    });
  }

  res.json(customer);
});

// POST create new customer
app.post('/api/customers', (req, res) => {
  const { name, email, city } = req.body;

  if (!name || !email || !city) {
    return res.status(400).json({
      success: false,
      message: "name, email, and city are required"
    });
  }

  const newCustomer = {
    id: customers.length + 1,
    name,
    email,
    city
  };

  customers.push(newCustomer);

  res.status(201).json({
    success: true,
    data: newCustomer
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Express server running on port ${PORT}`);
});
