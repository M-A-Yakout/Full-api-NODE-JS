const { MongoClient } = require('mongodb');
const { exit, title } = require('node:process');



const url = 'mongodb+srv://james:ALx39pGdAgR3ktxe@james.vweaczq.mongodb.net/all-Data?appName=JAMES'

const client = new MongoClient(url)

const dbname = 'NodeJs'

const collectionDB = 'courses'

const main = async () => {
    //connect database
    await client.connect();
    console.log('passed')
    //choose database
    const db = client.db(dbname)
    //choose collection to interact
    const collection = db.collection(collectionDB)

    // inset data

    const docs = [
        {
            title: 'Nodejs',
            price: 3000
        },
        {
            title: 'course django',
            price: 2500
        }
    ]

    const result = await collection.insertMany(docs)

    await collection.insertOne({
        title:'course New',
        price: 3000
    })
    console.log(result.insertedCount)
    // get query
    const data = await collection.find().toArray()
    console.log('data', data)
}

main()