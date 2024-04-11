require('dotenv').config()

// PUNTO 3: No existe sentencia DROP DATABASE IF EXISTS
// PUNTO 4: No se pueden colocar Constraints
// PUNTO 5: No se pueden hacer relaciones entre tablas
// PUNTO 9: No se puede normalizar, sin embargo, si se ha dinamizado la informacion en objetos


const { MongoClient } = require("mongodb")
const faker = require("faker")

// Connection URI
const uri = process.env.DATABASE_URI

// Database Name
const dbName = process.env.DB_NAME

// Collection names
const collectionNames = ["locations", "users", "orders"]
 v

// Generate mock data for locations
const generateLocations = (count) => {
  const locations = []
  for (let i = 0; i < count; i++) {
    const location = {
      id: faker.datatype.uuid(),
      title: faker.company.companyName() + " " + faker.address.city(),
      address: faker.address.streetAddress(),
      type: faker.random.arrayElement(["Sucursal", "Warehouse", "Office"]),
      phone_number: faker.phone.phoneNumber(),
      location: {
        point: faker.address.longitude() + "," + faker.address.latitude(),
        coordinates: [faker.address.longitude(), faker.address.latitude()]
      }
    }
    locations.push(location)
  }
  return locations
}

// Generate mock data for users
const generateUsers = (count) => {
  const users = []
  for (let i = 0; i < count; i++) {
    const user = {
      id: faker.datatype.uuid(),
      created_at: faker.date.past().toISOString(),
      updated_at: faker.date.recent().toISOString(),
      personal_information: {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        profile_picture: faker.image.avatar()
      },
      role: faker.random.arrayElement(["manager", "courier", "consumer", "support_agent"])
    }
    if (user.role === "consumer") {
      user.contacts = [
        { name: "Work", phone_number: faker.phone.phoneNumber() },
        { name: "Mobile", phone_number: faker.phone.phoneNumber() }
      ]
      user.addresses = [
        {
          id: faker.datatype.uuid(),
          name: "Home",
          type: "Home",
          phone_number: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          location: {
            point: faker.address.longitude() + "," + faker.address.latitude(),
            coordinates: [faker.address.longitude(), faker.address.latitude()]
          }
        }
      ]
    }
    users.push(user)
  }
  return users
}

// Generate mock data for orders
const generateOrders = (count) => {
  const orders = []
  for (let i = 0; i < count; i++) {
    const order = {
      id: faker.datatype.uuid(),
      status: ["En ruta"],
      delivery_confirmation: {
        courier_confirmation: {
          confirmed_at: faker.date.past().toISOString(),
          evidence_pictures: [faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl()]
        },
        receiver_confirmation: {
          state: "unconfirmed",
          evidence_pictures: []
        }
      },
      coordinates: [faker.address.longitude(), faker.address.latitude()],
      notifications: [
        {
          title: faker.lorem.words(),
          message: faker.lorem.sentence(),
          actions: [
            {
              title: "Open Order",
              type: "deeplink",
              "ios-deeplink": "lepique://pedido/" + faker.datatype.uuid(),
              "android-deeplink": "intent://lepique.com/pedido/" + faker.datatype.uuid() + "?#Intent;scheme=https;package=com.lepique.app;S.browser_fallback_url=https://www.lepique.com/order/" + faker.datatype.uuid(),
              "web-link": "https://www.lepique.com/order/" + faker.datatype.uuid()
            }
          ]
        }
      ],
      details: {
        reference: faker.random.alphaNumeric(6),
        product: faker.random.alphaNumeric(8),
        created_at: faker.date.past().toISOString(),
        estimated_delivery_date: faker.date.future().toLocaleDateString(),
        eta: faker.random.number(24) + " hours",
        contents: {
          type:  faker.random.arrayElement(["POS", "Documento", "Tarjeta de crédito", "Tarjeta de débito"])
        },
        sender_information: {
          assigned_manager_id: faker.datatype.uuid(),
          name: faker.company.companyName(),
          location_id: faker.datatype.uuid()
        },
        receiver_information: {
          id: faker.datatype.uuid(),
          name: faker.name.findName(),
          location_id: faker.datatype.uuid(),
          location_type: "consumer_address"
        },
        movements: [
          {
            id: faker.datatype.uuid(),
            date: faker.date.recent().toLocaleString(),
            title: faker.lorem.words(),
            location_id: faker.datatype.uuid(),
            coordinates: [faker.address.longitude(), faker.address.latitude()]
          },
          {
            id: faker.datatype.uuid(),
            date: faker.date.recent().toLocaleString(),
            title: faker.lorem.words(),
            coordinates: {
              start: [faker.address.longitude(), faker.address.latitude()],
              end: [faker.address.longitude(), faker.address.latitude()]
            }
          },
          {
            id: faker.datatype.uuid(),
            date: faker.date.recent().toLocaleString(),
            title: faker.lorem.words(),
            location_id: faker.datatype.uuid(),
            coordinates: [faker.address.longitude(), faker.address.latitude()]
          },
          {
            id: faker.datatype.uuid(),
            date: faker.date.recent().toLocaleString(),
            title: faker.lorem.words(),
            location_id: faker.datatype.uuid(),
            current: true,
            coordinates: {
              start: [faker.address.longitude(), faker.address.latitude()],
              end: [faker.address.longitude(), faker.address.latitude()]
            }
          }
        ]
      },
      rating: {
        "receiver-opinion": {
          comments: faker.lorem.sentence()
        },
        time_accomplished: faker.datatype.boolean(),
        time_delay: faker.random.number(24) + " hours"
      },
      chat_messages: [
        { id: faker.datatype.uuid(), sender: "consumer", content: faker.lorem.sentence() },
        { id: faker.datatype.uuid(), sender: "courier", content: faker.lorem.sentence() }
      ],
      "support-tickets": [
        {
          order_id: faker.datatype.uuid(),
          sender_id: faker.datatype.uuid(),
          consumer_id: faker.datatype.uuid(),
          assigned_support_agent: faker.datatype.uuid(),
          status: "open",
          title: faker.lorem.words(),
          short_description: faker.lorem.sentence(),
          chat_messages: [
            { id: faker.datatype.uuid(), sender: "support_agent", content: faker.lorem.sentence() },
            { id: faker.datatype.uuid(), sender: "consumer", content: faker.lorem.sentence() },
            { id: faker.datatype.uuid(), sender: "courier", content: faker.lorem.sentence() },
            { id: faker.datatype.uuid(), sender: "support_agent", content: faker.lorem.sentence() }
          ]
        }
      ]
    }
    orders.push(order)
  }
  return orders
}

// Generate mock data for the given JSON structure
const generateMockData = () => {
  const locations = generateLocations(30)
  const users = generateUsers(30)
  const orders = generateOrders(30)

  return { locations, users, orders }
}

// Insert mock data into MongoDB
const insertMockData = async () => {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(dbName)
    const mockData = generateMockData()

    // Insert mock data into collections

    for (let collectionName of collectionNames) {
      const collection = db.collection(collectionName)
      await collection.insertMany(mockData[collectionName])
      console.log(`Inserted ${mockData[collectionName].length} documents into ${collectionName}`)
    }

  } catch (err) {
    console.error("Error inserting mock data:", err)
  } finally {
    await client.close()
    console.log("Disconnected from MongoDB")
  }
}

// Call the insertMockData function
insertMockData()
