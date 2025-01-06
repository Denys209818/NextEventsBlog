import { MongoClient, ObjectId } from "mongodb";
import MeetupDetails from "../../components/meetups/MeetupDetails";

export default function MeetUpDetailsPage(props) {
    return (
        <MeetupDetails
            image={props.image}
            title={props.title}
            address={props.address}
            description={props.description}
        />
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        'mongodb+srv://deniskravchuk:lA9xTxFKAoOTRelJ@cluster0.7kdvz.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
    )

    const db = client.db();

    const meetupsCollecton = db.collection('meetups');

    const meetups = await meetupsCollecton.find({}, { _id: 1 }).toArray();
    
    client.close();
    return {
        paths: meetups.map(meetup => ({
            params: { meetupId: meetup._id.toString() }
        })),
        fallback: 'blocking'
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        'mongodb+srv://deniskravchuk:lA9xTxFKAoOTRelJ@cluster0.7kdvz.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
    )

    const db = client.db();

    const meetupsCollecton = db.collection('meetups');

    const meetup = await meetupsCollecton.findOne({ _id: new ObjectId(meetupId) });
    
    client.close();

    return {
        props: {
            id: meetup._id.toString(),
            title: meetup.title,
            address: meetup.address,
            description: meetup.description,
            image: meetup.image,
        },
        revalidate: 1,
    }
}