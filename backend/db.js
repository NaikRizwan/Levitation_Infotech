const mongoose = require("mongoose");

// Replace 'your_connection_uri' with your MongoDB connection URI
// const dbURI = 'mongodb://127.0.0.1:27017/ecommerce';

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://rizwannaik:<password>@cluster0.x1rjqqu.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

const dbURI =
  "mongodb+srv://mohdrizwan:vc1U3phJpRLs640L@cluster1.qdanenn.mongodb.net/?retryWrites=true&w=majority";
// "mongodb+srv://anishkumar3787230:anishkumar3787230@cluster0.utdqqjj.mongodb.net/visity_Assignment?retryWrites=true&w=majority";
// Connect to MongoDB
// "mongodb://127.0.0.1:27017/kashmir";
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Error handling
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Connection successful
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Export the connected mongoose instance
module.exports = mongoose;
