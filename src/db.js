const { MongoClient } = require('mongodb');

let client;
const dbName = 'kaisens';
const uri = "mongodb+srv://<password>:<username>@cluster0.l82vx.mongodb.net/"+dbName+"?retryWrites=true&w=majority"

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main(){
    /**
    * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
    * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
    */
    client = new MongoClient(uri, {useUnifiedTopology: true});

    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        // await client.close();
    }
}
main().catch(console.error);

module.exports = {
    insert: async (obj)=>{
        const db = client.db(dbName);
        const col = db.collection('instagram');
        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertMany(obj);
        console.log('inserted')
    }
}