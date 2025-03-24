import { useState } from 'react';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { toDateTimeLocalString } from './DiaryEntry';
import { Typography } from '@mui/material';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';

const regStyle = {
    m: 1,
    minWidth: '20em',
}

function Register(props: { firebaseApp: FirebaseApp, auth: Auth}) {

    const [entry, setEntry] = useState({
        name: '',
        email: '',
        birthday: new Date(),
        password: '',
        retypePassword: '',
    });
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const validate = () => {
        if (entry.email === '') {
            setError('Email is required')
            return
        }
        if (entry.password !== entry.retypePassword) {
            setError("Passwords didn't match")
            return
        }
    }

    return <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
    >
        <h1>Register</h1>
        <form>
            <TextField
                id="name"
                label="Name"
                variant="outlined"
                onChange={(event) => {
                    entry.name = event.target.value
                    setEntry({ ...entry })
                }}
                required
                sx={{ ...regStyle }} />
            <TextField
                id="email"
                label="Email"
                type='email'
                variant="outlined"
                onChange={(event) => {
                    entry.email = event.target.value
                    setEntry({ ...entry })
                }}
                required
                sx={{ ...regStyle }} />
            <TextField
                id="password"
                label="Password"
                type='password'
                variant="outlined"
                onChange={(event) => {
                    entry.password = event.target.value
                    setEntry({ ...entry })
                }}
                required
                sx={{ ...regStyle }} />
            <TextField
                id="password2"
                label="Retype password"
                type='password'
                variant="outlined"
                onChange={(event) => {
                    entry.retypePassword = event.target.value
                    setEntry({ ...entry })
                }}
                required sx={{ ...regStyle }} />
            <TextField
                id="birthday"
                label="Birthday"
                type='datetime-local' variant="outlined"
                value={toDateTimeLocalString(entry.birthday ?? new Date())}
                onChange={(event) => {
                    entry.birthday = new Date(event.target.value)
                    setEntry({ ...entry })
                }}
                required
                sx={{ ...regStyle }} />
            <Stack spacing={2} direction="row" sx={{ ...regStyle }}>
                <Button variant="contained" onClick={() => navigate('/')}>Cancel</Button>
                <Button variant="contained" onClick={() => validate()}>Register</Button>
            </Stack>
            <Typography color='error'>{error}</Typography>
        </form>
    </Box>
}

export default Register