import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = req.body;

        const client = await MongoClient.connect(
            'mongodb+srv://deniskravchuk:lA9xTxFKAoOTRelJ@cluster0.7kdvz.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
        );

        const db = client.db();

        const meetupCollections = db.collection('meetups');

        const result = await meetupCollections.insertOne(body);

        console.log(result);
        console.log('Body: ', body);

        client.close();

        res.status(201).json({ message: 'Meeting is created!' });
    }
}