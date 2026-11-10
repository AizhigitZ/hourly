const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'registrations.json');
const ADMIN_PASSWORD = 'hourly2025';

// Middleware
app.use(cors());
app.use(express.json());

// Helper: read/write data
function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// POST /api/register - Submit a registration
app.post('/api/register', (req, res) => {
  try {
    const { name, phone, contactMethod, level, course, message } = req.body;
    
    if (!name || !phone || !level || !course) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const registrations = readData();
    const newRegistration = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      name,
      phone,
      contactMethod: contactMethod || 'phone',
      level,
      course,
      message: message || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    registrations.unshift(newRegistration);
    writeData(registrations);

    res.status(201).json({ success: true, id: newRegistration.id });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/admin/login - Admin login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    // Simple token-based auth
    const token = Buffer.from(`admin:${Date.now()}`).toString('base64');
    res.json({ success: true, token });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Middleware: verify admin token
function verifyAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = Buffer.from(auth.split(' ')[1], 'base64').toString();
    if (decoded.startsWith('admin:')) {
      next();
    } else {
      res.status(401).json({ error: 'Invalid token' });
    }
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// GET /api/admin/registrations - Get all registrations
app.get('/api/admin/registrations', verifyAdmin, (req, res) => {
  const registrations = readData();
  res.json(registrations);
});

// PATCH /api/admin/registrations/:id - Update registration status
app.patch('/api/admin/registrations/:id', verifyAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!['pending', 'contacted', 'enrolled', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const registrations = readData();
  const index = registrations.findIndex(r => r.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Registration not found' });
  }

  registrations[index].status = status;
  writeData(registrations);
  res.json(registrations[index]);
});

// DELETE /api/admin/registrations/:id - Delete a registration
app.delete('/api/admin/registrations/:id', verifyAdmin, (req, res) => {
  const { id } = req.params;
  const registrations = readData();
  const filtered = registrations.filter(r => r.id !== id);
  
  if (filtered.length === registrations.length) {
    return res.status(404).json({ error: 'Registration not found' });
  }

  writeData(filtered);
  res.json({ success: true });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`HOURLY API server running on http://0.0.0.0:${PORT}`);
});
