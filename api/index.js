const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string - should be in .env file
const uri = "mongodb://bab:bab12345@cluster0-shard-00-00.49lhv.mongodb.net:27017,cluster0-shard-00-01.49lhv.mongodb.net:27017,cluster0-shard-00-02.49lhv.mongodb.net:27017/?ssl=true&replicaSet=atlas-8ih12o-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

// Create MongoDB client
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");
    
    const database = client.db("Cluster0");
    const collection = database.collection("creds");
    
    // Test endpoint
    app.get('/test', async (req, res) => {
      res.json({ success: true, message: 'API is working' });
    });
    
    // UPLOAD endpoint - Save data associated with ETH address
    app.post('/api/upload', async (req, res) => {
      try {
        const { ethAddress, jsonData } = req.body;
        console.log(ethAddress, jsonData);
        
        if (!ethAddress) {
          return res.status(400).json({ error: 'Ethereum address is required' });
        }
        
        const result = await collection.insertOne({ 
          ethAddress: ethAddress.toLowerCase(), 
          jsonData,
          createdAt: new Date()
        });
        
        res.status(201).json({ 
          success: true, 
          id: result.insertedId 
        });
      } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Server error' });
      }
    });
    
    // GET endpoint - Retrieve data by ETH address
    app.get('/api/get/:ethAddress', async (req, res) => {
      try {
        const { ethAddress } = req.params;
        
        const data = await collection.find({ 
          ethAddress: ethAddress.toLowerCase() 
        })
        .sort({ createdAt: -1 })
        .toArray();
        
        res.json({ success: true, data });
      } catch (error) {
        console.error('Get error:', error);
        res.status(500).json({ error: 'Server error' });
      }
    });
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

// Run the application
run().catch(console.dir);

