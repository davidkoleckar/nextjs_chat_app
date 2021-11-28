import { Avatar } from '@mui/material';
import styled from 'styled-components';
import getRecipientEmail from '../utils/getRecipientEmail'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase-config';
import { collection, query, where, onSnapshot } from "firebase/firestore"; 
import {useState, useEffect} from "react";
import {useRouter} from 'next/router';

function Chat({id, users}) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const recipientEmail = getRecipientEmail(users, user);
    const recipientQuery = query(collection(db, "users"), where("users", '==', recipientEmail));
    const [recipient, setRecipient] = useState(null);

    useEffect(() => {
        onSnapshot(recipientQuery, (snapshot) => {
            console.log(snapshot.docs[0])
            setRecipient(snapshot.docs?.[0]?.data())
        })
    }, [])

    const enterChat = () => {
        router.push(`/chat/${id}`);
    }

    return (
        <Container onClick={enterChat}>
            {
                recipient ? (
                    <UserAvatar src={recipient?.photoURL}/>
                ) : (
                    <UserAvatar src={recipientEmail[0]}/>
                )
            }
            <p>{recipientEmail}</p>
        </Container>
    )
}

export default Chat;


const Container = styled.div`
    display: flex;
    align-items: center;
    word-break: break-word;
    padding: 15px;
    cursor: pointer;
    :hover{
        background: #e9eaeb;
    }
`;

const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`;