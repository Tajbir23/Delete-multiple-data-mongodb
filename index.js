require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 5000


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.sdyx3bs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = await client.db('test-form')
    const collection = await database.collection('test-form')


    app.post('/add', async (req, res) => {
        const data = req.body
        console.log(data)
        const result = await collection.insertOne(data)
        res.send(result)
    })

    app.get('/get', async (req, res) => {
        const result = await collection.find().toArray()
        console.log(result)
        res.send(result)
    })

    app.delete('/delete', async (req, res) => {
        const deleteId = req.body
        const ids = deleteId.map((value) => {
          return new ObjectId(value)
        })
        const result = await collection.deleteMany({_id: {$in: ids}})
        res.send(result)
        console.log(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.error);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => console.log(`server is running on http://localhost:${port}`))