import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { FirebaseApp } from 'firebase/app';
import { Auth, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

const regStyle = {
    m: 1,
    minWidth: '20em',
}

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState({
        type: '' as ('success' | 'error' | ''),
        text: ''
    })

    const login = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setMessage({type: 'success', text: `${user.email} successfully logged`})
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setMessage({type: 'error', text: `Login failed: ${errorCode} ${errorMessage}`})
            });
    }

    return <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
    >
        <h1>Login</h1>
        <TextField
            id="email"
            label="Email"
            type='email'
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required sx={{ ...regStyle }}
        />
        <TextField
            id="password"
            label="Password"
            type='password'
            variant="outlined"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required sx={{ ...regStyle }}
        />
        <Stack spacing={2} direction="row" sx={{ ...regStyle }}>
            <Button variant="contained" onClick={() => navigate('/')}>Cancel</Button>
            <Button variant="contained" onClick={() => login()}>Login</Button>
        </Stack>
        {message.type !== '' && (
            <Alert severity={message.type}>{message.text}</Alert>
        )}
    </Box>
}
export default Login