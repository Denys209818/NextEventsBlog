import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { Fragment } from 'react';
import Head from 'next/head';

export default function NewMeetUpPage() {
    const router = useRouter();

    async function handleMeetupData(enteredMeetupData) {

        const result = await fetch('/api/meetup-create', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type':'application/json'
            }
        });

        const data = await result.json();

        router.push('/');
    }
    
    return (<Fragment>
        <Head>
            <title>Create a meetup</title>
            <meta title='description' content='A page for creating a meetup' />
        </Head>
        <NewMeetupForm onAddMeetup={handleMeetupData} />
    </Fragment>)
}