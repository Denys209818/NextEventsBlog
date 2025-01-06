import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';
import Head from 'next/head';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'The First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/M%C3%BCnchen_Panorama-CN.jpg/1280px-M%C3%BCnchen_Panorama-CN.jpg',
        address: 'Some address of some City, 12345',
        description: 'First Meetup description'
    },
    {
        id: 'm2',
        title: 'The Second Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/M%C3%BCnchen_Panorama-CN.jpg/1280px-M%C3%BCnchen_Panorama-CN.jpg',
        address: 'Some address of some City, 12345',
        description: 'Second Meetup description'
    }
];

export default function MainPage(props) {
    return <Fragment>
        <Head>
            <title>Main Page</title>
            <meta title='description' content='Main page for the application' />
        </Head>

        <MeetupList meetups={props.meetups} />
    </Fragment>
}

export async function getStaticProps() {
    const client = await MongoClient.connect(
        'mongodb+srv://deniskravchuk:lA9xTxFKAoOTRelJ@cluster0.7kdvz.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
    )

    const db = client.db();
    const meetupConnection = db.collection('meetups');

    const meetups = await meetupConnection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                description: meetup.address,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 1,
    };
}

// export function getServerSideProps() {
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         },
//     };
// }