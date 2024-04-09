// PUNTO 3: No existe sentencia DROP DATABASE IF EXISTS
// PUNTO 4: No se pueden colocar Constraints
// PUNTO 5: No se pueden hacer relaciones

// Connect to MongoDB Server
const { MongoClient } = require('mongodb')
const uri = "mongodb+srv://payload-cms:payload-cms@lepique-cms.4xqtwo8.mongodb.net/?retryWrites=true&w=majority&appName=lepique-cms"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    try {

        const db = client.db
        const locationsCollection = db.getCollection('locations')
        const usersCollection = db.getCollection('users')
        const ordersCollection = db.getCollection('orders')
        
        // Inserting documents to the locations collection
        
        
    } catch {

    }
}