import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Auth, provider } from '../firebaseConfig'

const Login = ({ GetUser, user, SetUser }) => {
    const signIn = () => {
        Auth.signInWithPopup(provider).then((result) => {
            const NewUser = {
                Name: result.user.displayName,
                Email: result.user.email,
                Photo: result.user.photoURL
            }
            localStorage.setItem('user', JSON.stringify(NewUser));
            GetUser(NewUser);
        }).catch(err => {
            alert(err.message)
            console.log(err.message)
        })
    }

    const SignOut = () => {
        Auth.signOut().then(() => {
            localStorage.removeItem('user')
            SetUser(null)
        }).catch(err => {
            alert(err.message);
        })
    }

    return (
        <Container>
            <Content>
                <Logo src={'http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG'}/>
                <h2>Sign into Amazon</h2>
                {
                    user ? <Button className='signInBtn' onClick={SignOut}>Sign out</Button>
                         : <Button className='signInBtn' onClick={signIn}>Sign in with Google</Button>
                }
            </Content>
        </Container>
    )
}

export default Login;

const Container = styled.section`
    width: 100%;
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: #f8f8f8;
`
const Content = styled.div`
    padding: 100px 60px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 1px 3px gray;
    text-align: center;
`
const Logo = styled.img`
    height: 100px;
    margin-bottom: 40px;
`