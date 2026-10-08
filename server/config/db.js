const mongoose = require('mongoose');
const dns = require('dns');

// Ensure SRV DNS records resolve reliably on Windows networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if custom DNS cannot be set
}

const connectDB = async () => {
  try {
    const atlasUri = 'mongodb+srv://ankitk1907777_db_user:JMIuZ5IhzLLFRMUE@cluster0.pnoktxz.mongodb.net/goel_paints?retryWrites=true&w=majority&appName=Cluster0';
    const conn = await mongoose.connect(process.env.MONGODB_URI || atlasUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
