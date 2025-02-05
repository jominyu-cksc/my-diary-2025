import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const regStyle = {
    m: 1,
    minWidth: '20em',
}

function Register() {

    const navigate = useNavigate();

    return <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
    >
        <h1>Register</h1>
        <form>
            <TextField id="name" label="Name" variant="outlined" required sx={{ ...regStyle }} />
            <TextField id="email" label="Email" type='email' variant="outlined" required sx={{ ...regStyle }} />
            <TextField id="password" label="Password" type='password' variant="outlined" required sx={{ ...regStyle }} />
            <TextField id="password2" label="Retype password" type='password' variant="outlined" required sx={{ ...regStyle }} />
            <TextField id="birthday" label="Birthday" type='date' variant="outlined" required sx={{ ...regStyle }} />
            <Stack spacing={2} direction="row" sx={{ ...regStyle }}>
                <Button variant="contained" onClick={() => navigate('/')}>Cancel</Button>
                <Button variant="contained">Register</Button>
            </Stack>
        </form>
    </Box>
}

export default Register