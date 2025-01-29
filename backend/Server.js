const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sajjad',
  database: 'e_mart',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Fetch laptops data
app.get('/api/laptops', (req, res) => {
  const sql = 'SELECT * FROM products WHERE category = "laptop"';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching laptops:', err);
      res.status(500).send('Error fetching laptops');
      return;
    }
    res.json(results);
  });
});

// Fetch mobiles data
app.get('/api/mobiles', (req, res) => {
  const sql = 'SELECT * FROM products WHERE category = "mobile"';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching mobiles:', err);
      res.status(500).send('Error fetching mobiles');
      return;
    }
    res.json(results);
  });
});

// Fetch headsets data
app.get('/api/headsets', (req, res) => {
  const sql = 'SELECT * FROM products WHERE category = "headset"';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching headsets:', err);
      res.status(500).send('Error fetching headsets');
      return;
    }
    res.json(results);
  });
});

// Fetch smartwatches data
app.get('/api/smartwatches', (req, res) => {
  const sql = 'SELECT * FROM products WHERE category = "smartwatch"';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching smartwatches:', err);
      res.status(500).send('Error fetching smartwatches');
      return;
    }
    res.json(results);
  });
});

// Handle POST request to add new product
app.post('/api/add-new', (req, res) => {
    const { name, description, price, category } = req.body;
    console.log('Received request body:', req.body); 
  
    if (!name || !description || !price || !category) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
  
    console.log('Category:', category); 
    console.log('Valid Categories:', validCategories); 
  
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
  
    const query = `INSERT INTO products (name, description, price, category) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, description, price, category], (err, result) => {
      if (err) {
        console.error('Error adding new product:', err);
        res.status(500).json({ error: 'Error adding new product' });
        return;
      }
      console.log('New product added successfully');
      res.json({ message: 'New product added successfully', productId: result.insertId });
    });
  });
  
// Fetch laptop details by ID
app.get('/laptops/:id', (req, res) => {
  const laptopId = req.params.id;
  const sql = 'SELECT * FROM products WHERE id = ? AND category = "laptop"';
  db.query(sql, [laptopId], (err, results) => {
    if (err) {
      console.error('Error fetching laptop details:', err);
      res.status(500).send('Error fetching laptop details');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Laptop not found');
      return;
    }
    res.json(results[0]);
  });
});

// Fetch mobile details by ID
app.get('/mobiles/:id', (req, res) => {
  const mobileId = req.params.id;
  const sql = 'SELECT * FROM products WHERE id = ? AND category = "mobile"';
  db.query(sql, [mobileId], (err, results) => {
    if (err) {
      console.error('Error fetching mobile details:', err);
      res.status(500).send('Error fetching mobile details');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Mobile not found');
      return;
    }
    res.json(results[0]);
  });
});

// Fetch headset details by ID
app.get('/headsets/:id', (req, res) => {
  const headsetId = req.params.id;
  const sql = 'SELECT * FROM products WHERE id = ? AND category = "headset"';
  db.query(sql, [headsetId], (err, results) => {
    if (err) {
      console.error('Error fetching headset details:', err);
      res.status(500).send('Error fetching headset details');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Headset not found');
      return;
    }
    res.json(results[0]);
  });
});

// Fetch smartwatch details by ID
app.get('/smartwatches/:id', (req, res) => {
  const smartwatchId = req.params.id;
  const sql = 'SELECT * FROM products WHERE id = ? AND category = "smartwatch"';
  db.query(sql, [smartwatchId], (err, results) => {
    if (err) {
      console.error('Error fetching smartwatch details:', err);
      res.status(500).send('Error fetching smartwatch details');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Smartwatch not found');
      return;
    }
    res.json(results[0]);
  });
});

// Nodemailer transporter using smtp.ethereal.email server
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'cielo.rohan92@ethereal.email', 
    pass: 'za577NR4DczNecxa4s', 
  },
});

// Endpoint to verify OTP
app.post('/api/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    
    const query = 'SELECT * FROM otps WHERE email = ? AND otp = ? AND expiry > NOW()';
    
    db.query(query, [email, otp], (err, results) => {
        if (err) {
            console.error('Error verifying OTP:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        if (results.length > 0) {
            res.json({ verified: true, message: 'OTP verified successfully' });
        } else {
            res.status(400).json({ verified: false, error: 'Invalid or expired OTP' });
        }
    });
});



// Valid categories
const validCategories = ['laptop', 'mobile', 'smartwatch', 'headset'];

// Handle POST request to send OTP to user's email
app.post('/api/send-otp', (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email address is required' });
    }
  
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); 
  
    const mailOptions = {
      from: 'your_ethereal_email@ethereal.email',
      to: email,
      subject: 'Your OTP for Verification',
      text: `Your OTP is: ${otp}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json({ error: 'Failed to send OTP. Please try again later.' });
      }
      console.log('OTP sent successfully:', info.response);
  
      const query = 'INSERT INTO otps (email, otp, expiry) VALUES (?, ?, ?)';
      db.query(query, [email, otp, expiry], (err, result) => {
        if (err) {
          console.error('Error storing OTP:', err);
          return res.status(500).json({ error: 'Failed to store OTP. Please try again later.' });
        }
        res.json({ message: 'OTP sent successfully' });
      });
    });
  });
  


function calculateProfitPercentage(category) {
  switch (category) {
    case 'laptop':
      return 20;
    case 'mobile':
      return 15;
    case 'headset':
      return 13;
    case 'smartwatch':
      return 14;
    default:
      return 0;
  }
}

// Endpoint to verify OTP and store product details
app.post('/api/store-product-details', (req, res) => {
    const { productId, paymentMethod, amount, convenienceFee, totalCost, email, otp, category } = req.body;

    if (!email || !otp || !productId || !paymentMethod || !amount || !convenienceFee || !totalCost || !category) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const otpQuery = 'SELECT * FROM otps WHERE email = ? AND otp = ? AND expiry > NOW()';
    db.query(otpQuery, [email, otp], (err, results) => {
        if (err) {
            console.error('Error verifying OTP:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            const profitPercentage = calculateProfitPercentage(category, totalCost);
            const insertPaymentQuery = 'INSERT INTO payments (product_id, payment_method, amount, convenience_fee, total_cost, email, otp, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(insertPaymentQuery, [productId, paymentMethod, amount, convenienceFee, totalCost, email, otp, 'completed'], (err, result) => {
                if (err) {
                    console.error('Error storing payment details:', err);
                    return res.status(500).json({ error: 'Failed to store payment details' });
                }

                const insertProductDetailsQuery = 'INSERT INTO product_details (category, profit_percentage) VALUES (?, ?)';
                db.query(insertProductDetailsQuery, [category, profitPercentage], (err, result) => {
                    if (err) {
                        console.error('Error storing product details:', err);
                        return res.status(500).json({ error: 'Failed to store product details' });
                    }
                    res.json({ success: true, message: 'Order is Successfully Placed' });
                });
            });
        } else {
            res.status(400).json({ error: 'Invalid or expired OTP' });
        }
    });
});

function calculateProfitPercentage(category, totalCost) {
    let profitPercentage;
    switch (category) {
        case 'laptop':
            profitPercentage = 0.20 * totalCost;
            break;
        case 'headset':
            profitPercentage = 0.15 * totalCost;
            break;
        case 'smartwatch':
            profitPercentage = 0.12 * totalCost;
            break;
        case 'mobile':
            profitPercentage = 0.10 * totalCost;
            break;
        default:
            profitPercentage = 0;
    }
    return profitPercentage;
}

app.get('/:category/:id', (req, res) => {
  const { category, id } = req.params;
  const query = `SELECT * FROM products WHERE id = ? AND category = ?`;

  db.query(query, [id, category], (err, results) => {
    if (err) {
      console.error('Error fetching product details:', err);
      return res.status(500).json({ error: 'Failed to fetch product details' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(results[0]);
  });
});

// Endpoint to fetch product sales count by category
app.post('/api/product-sales', (req, res) => {
    const { fromDate, toDate } = req.body;
    const query = `
      SELECT category, COUNT(*) as count
      FROM product_details
      WHERE created_at BETWEEN ? AND ?
      GROUP BY category
    `;
    db.query(query, [fromDate, toDate], (err, results) => {
      if (err) {
        console.error('Error fetching product sales data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      const data = {};
      results.forEach(row => {
        data[row.category] = row.count;
      });
      res.json(data);
    });
  });
  
  // Endpoint to fetch average profit percentage by category
  app.post('/api/profit-percentage', (req, res) => {
    const { fromDate, toDate } = req.body;
    const query = `
      SELECT category, AVG(profit_percentage) as avg_profit
      FROM product_details
      WHERE created_at BETWEEN ? AND ?
      GROUP BY category
    `;
    db.query(query, [fromDate, toDate], (err, results) => {
      if (err) {
        console.error('Error fetching profit percentage data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      const data = {};
      results.forEach(row => {
        data[row.category] = row.avg_profit;
      });
      res.json(data);
    });
  });
  

app.listen(8082, () => console.log("Server running on port 8082"));
