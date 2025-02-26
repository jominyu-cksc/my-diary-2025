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

import { format } from 'date-fns/format';

import { DiaryEntryType, moodList, sampleDiary } from '../data/Diary';

export const toDateTimeLocalString = (date: Date) => {
    return format(date, 'yyyy-MM-dd\'T\'HH:mm:ss')
}

const regStyle = {
    m: 1,
    minWidth: '20em',
}

function DiaryEntry() {
    const items = sampleDiary

    const [entry, setEntry] = useState<DiaryEntryType>({
        id: '',
        mood: 1,
        date: new Date(),
        title: '',
        content: '',
    });

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

    const save = () => {
        if (!entry) {
            return
        }
        if (entry.id === '') {
            entry.id = (items.length + 1) + ''
            items.push(entry)
        }
    }

    return (
        <Box sx={{ width: '95%' }}>
            <h1>Diary Entry</h1>
            <form>
                <FormControl sx={{ ...regStyle }} >
                    <InputLabel id="mood-label">Mood</InputLabel>
                    <Select
                        labelId="mood-label"
                        id="mood-select"
                        value={entry.mood ?? 1}
                        label="Mood"
                        onChange={(event) => {
                            entry.mood = event.target.value as number
                            setEntry({ ...entry })
                        }}
                    >
                        {moodList.map((item, index) => (
                            <MenuItem value={item.mood} key={index}>
                                <Box component='span' sx={{ fontSize: '1.6em' }}>
                                    {moodList[item.mood - 1].icon}
                                </Box>
                                <span style={{ paddingLeft: '0.7em' }}>{item.text}</span>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    id="date"
                    label="Date/Time"
                    type='datetime-local' variant="outlined"
                    value={toDateTimeLocalString(entry?.date ?? new Date())}
                    onChange={(event) => {
                        entry.date = new Date(event.target.value)
                        setEntry({ ...entry })
                    }}
                    required
                    sx={{ ...regStyle }} />
                <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    value={entry?.title}
                    onChange={(event) => {
                        entry.title = event.target.value
                        setEntry({ ...entry })
                    }}
                    fullWidth
                    required
                    sx={{ ...regStyle }} />
                <TextField
                    id="content"
                    label="Content"
                    variant="outlined"
                    value={entry?.content}
                    onChange={(event) => {
                        entry.content = event.target.value
                        setEntry({ ...entry })
                    }}
                    fullWidth
                    required
                    sx={{ ...regStyle }} />
                <Stack spacing={2} direction="row" sx={{ ...regStyle }}>
                    <Button variant="contained" onClick={() => navigate('/')}>Cancel</Button>
                    <Button variant="contained" onClick={() => save()}>Save</Button>
                </Stack>
            </form>
        </Box>
    )
}

export default DiaryEntry