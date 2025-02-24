import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { DiaryEntryType, moodList, sampleDiary } from '../data/Diary';

const regStyle = {
    m: 1,
    minWidth: '20em',
}

function DiaryEntry() {
    const items = sampleDiary

    const [entry, setEntry] = useState<DiaryEntryType | null>(null);

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        if (searchParams.has('id')) {
            const id = searchParams.get('id')
            const found = items.find(item => item.id === id)
            if (found) {
                console.log(found)
                setEntry(found)
            }
        }
    }, [location])

    return (
        <Box sx={{ width: '95%' }}>
            <h1>Diary Entry</h1>
            <form>
                <FormControl sx={{ ...regStyle }} >
                    <InputLabel id="mood-label">Mood</InputLabel>
                    <Select
                        labelId="mood-label"
                        id="mood-select"
                        value={entry?.id}
                        label="Mood"
                        onChange={() => { }}
                    >
                        {moodList.map(item => (
                            <MenuItem value={item.mood}>
                                <Box component='span' sx={{ fontSize: '1.6em' }}>
                                    {moodList[item.mood - 1].icon}
                                </Box>
                                <span style={{ paddingLeft: '0.7em' }}>{item.text}</span>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField id="date" label="Date/Time" type='datetime-local' value={entry?.date} variant="outlined" required sx={{ ...regStyle }} />
                <TextField id="title" label="Title" value={entry?.title} variant="outlined" fullWidth required sx={{ ...regStyle }} />
                <TextField id="content" label="Content" variant="outlined" value={entry?.content} fullWidth required sx={{ ...regStyle }} />
                <Stack spacing={2} direction="row" sx={{ ...regStyle }}>
                    <Button variant="contained" onClick={() => navigate('/')}>Cancel</Button>
                    <Button variant="contained">Save</Button>
                </Stack>
            </form>
        </Box>
    )
}

export default DiaryEntry