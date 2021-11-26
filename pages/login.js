import styled from 'styled-components';
import Head from "next/head";
import Button from '@mui/material/Button';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from "firebase/auth";

function Login() {

    const signIn = () => {
        try {
            signInWithPopup(auth, provider)
        } catch (e) {
            console.log(e.code, e.message)
        }
    }

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo 
                    src="http://assets.stickpng.com/images/580b585b2edbce24c47b23f0.png"
                />
                <Button onClick={signIn} variant="outlined">Sign in with Google</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login;

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`;

const LoginContainer = styled.div`
    padding: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 5px;
`;

const Logo = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom: 50px;
`;