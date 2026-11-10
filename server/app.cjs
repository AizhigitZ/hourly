const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hourly2025';

// Middlewares
app.use(cors());
app.use(express.json());

// Path resolution for data file
const SEED_FILE = path.join(__dirname, 'registrations.json');
const TMP_FILE = '/tmp/hourly_registrations.json';

let memoryRegistrations = null;

function getSeedData() {
  try {
    return require('./registrations.json');
  } catch {
    try {
      if (fs.existsSync(SEED_FILE)) {
        return JSON.parse(fs.readFileSync(SEED_FILE, 'utf-8'));
      }
    } catch {}
  }
  return [];
}

function getDataFilePath() {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return TMP_FILE;
  }
  return SEED_FILE;
}

function readData() {
  if (memoryRegistrations !== null) {
    return memoryRegistrations;
  }
  const filePath = getDataFilePath();
  try {
    if (fs.existsSync(filePath)) {
      memoryRegistrations = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return memoryRegistrations;
    }
  } catch (e) {
    console.error('Error reading data file:', e);
  }
  memoryRegistrations = getSeedData();
  return memoryRegistrations;
}

function writeData(data) {
  memoryRegistrations = data;
  const filePath = getDataFilePath();
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    try {
      fs.writeFileSync(TMP_FILE, JSON.stringify(data, null, 2));
    } catch (e) {
      console.warn('Could not persist to disk, stored in memory cache:', e.message);
    }
  }
}

// Router for API endpoints
const router = express.Router();

// GET /health
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    registrations: readData().length,
    timestamp: new Date().toISOString()
  });
});

// POST /register - Submit a registration
router.post('/register', (req, res) => {
  try {
    const { name, phone, contactMethod, level, course, message } = req.body || {};

    if (!name || !phone || !level || !course) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const registrations = readData();
    const newRegistration = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
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

// POST /admin/login - Admin login
router.post('/admin/login', (req, res) => {
  const { password } = req.body || {};
  if (password === ADMIN_PASSWORD) {
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

// GET /admin/registrations - Get all registrations
router.get('/admin/registrations', verifyAdmin, (req, res) => {
  const registrations = readData();
  res.json(registrations);
});

// PATCH /admin/registrations/:id - Update registration status
router.patch('/admin/registrations/:id', verifyAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};

  if (!['pending', 'contacted', 'enrolled', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const registrations = readData();
  const index = registrations.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Registration not found' });
  }

  registrations[index].status = status;
  writeData(registrations);
  res.json(registrations[index]);
});

// DELETE /admin/registrations/:id - Delete a registration
router.delete('/admin/registrations/:id', verifyAdmin, (req, res) => {
  const { id } = req.params;
  const registrations = readData();
  const filtered = registrations.filter((r) => r.id !== id);

  if (filtered.length === registrations.length) {
    return res.status(404).json({ error: 'Registration not found' });
  }

  writeData(filtered);
  res.json({ success: true });
});

// Mount router on both '/api' and '/' so it handles requests whether prefixed or not
app.use('/api', router);
app.use('/', router);

// Serve static frontend build if dist exists
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

module.exports = app;
