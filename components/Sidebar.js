import { Avatar, Button, IconButton } from '@mui/material';
import styled from 'styled-components';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from "email-validator";
import { auth } from '../firebase-config';
import { signOut } from "firebase/auth";

const Sidebar = () => {

    const createChat = () => {
        const input = prompt('Please enter an email for the use you wish to chat with.')
    
        if(!input) return null;

        if(EmailValidator.validate(input)) {
            //add chat into the DB chats collection

        }
    }

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
                <UserAvatar onClick={signOutHandler}/>

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