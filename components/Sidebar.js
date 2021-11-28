import { Avatar, Button, IconButton } from '@mui/material';
import styled from 'styled-components';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from "email-validator";
import { auth, db } from '../firebase-config';
import { signOut } from "firebase/auth";
import { addDoc, collection, query, where, getDocs, onSnapshot } from "firebase/firestore"; 
import { useAuthState } from 'react-firebase-hooks/auth';
import Chat from './Chat';
import {useState, useEffect} from "react";

const Sidebar = () => {
    const [user] = useAuthState(auth);
    const userChatRef = query(collection(db, "chats"), where("users", 'array-contains', user.email));
    const [chats, setChats] = useState([]);

    useEffect(() => {
        onSnapshot(userChatRef, (snapshot) => {
            setChats(snapshot.docs)
        })
    }, [])

    const createChat = () => {
        const input = prompt('Please enter an email for the use you wish to chat with.')
    
        if(!input) return null;
        getChats(input).then(chats => {
            const exists = chatAlreadyExists(chats, input);
            
            if(
                EmailValidator.validate(input) && 
                !exists && 
                input !== user.email
            ) {
                console.log("add")
                //add chat into the DB chats collection
                addDoc(collection(db, "chats"), {
                    users: [user.email, input],
                });
            }
        });

    }

    const getChats = async () => getDocs(userChatRef);

    const chatAlreadyExists = (chats, recipientEmail) => 
        !!chats.docs.find((chat) =>
            chat.data().users.find((user) => user === recipientEmail)?.length > 0
        )

    const signOutHandler = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            console.log(error)
          });
    }

    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={signOutHandler}/>

                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>

            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats"/>
            </Search>

            <SideBarButton onClick={createChat}>Start a new chat</SideBarButton>

            {/* List of chats */}

            {
                chats.map((chat) => 
                    <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
                )
            }
        </Container>
    )
}

export default Sidebar;

const SideBarButton = styled(Button)`
    width: 100%;
    &&& { //increase priority
        border-bottom: 1px solid whitesmoke;
        border-top: 1px solid whitesmoke;
    }
`;

const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
`;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 2px;
`;

const Container = styled.div``;

const Header = styled.div`
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div`
`;