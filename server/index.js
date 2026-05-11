import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dns from 'dns';
import connectDB from './db.js';
import contactRoutes from './routes/contactRoutes.js';

// Check if we are running on Render
// Render automatically sets the 'RENDER' variable to true
if (!process.env.RENDER) {
  console.log("Local environment detected: using Google DNS fix.");
  dns.setServers(['8.8.8.8', '8.8.4.4']);
}

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', contactRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});