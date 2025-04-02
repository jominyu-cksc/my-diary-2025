import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { format } from 'date-fns/format';

import { DiaryEntryType, moodList, sampleDiary } from '../data/Diary';
import { StorageService } from '../service/StorageService';
import { Editor } from '@tinymce/tinymce-react';
import { Typography } from '@mui/material';

export const toDateTimeLocalString = (date: Date) => {
    return format(date, 'yyyy-MM-dd\'T\'HH:mm:ss')
}

const regStyle = {
    m: 1,
    minWidth: '20em',
}

function DiaryView(props: any) {

    const { db, auth } = props
    const editorRef = useRef(null)

    const [entry, setEntry] = useState<DiaryEntryType>({
        id: '',
        mood: 0,
        star: 1,
        date: new Date(),
        title: '',
        content: '',
    });

    const storageService = new StorageService(auth, db)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        if (searchParams.has('id')) {
            const id = searchParams.get('id')
            storageService.getEntry(id ?? '').then(entry => {
                if (entry) {
                    setEntry(entry)
                }
            }).catch(error => console.log(error))
        }
    }, [location])

    return (
        <Box sx={{ width: '95%' }}>
            <h1>Diary Entry</h1>
                <Typography component="span">Mood</Typography>
                <Box component='span' sx={{ fontSize: '1.6em' }}>
                    {moodList[entry.mood].icon}
                </Box>
                <span style={{ paddingLeft: '0.7em' }}>{moodList[entry.mood].text}</span>
                <CalendarMonthIcon />
                <Typography component="span">{toDateTimeLocalString(entry?.date ?? new Date())}</Typography>
                <TextField sx={{ ...regStyle, minWidth: '5em' }}
                    value={entry.star ?? 1}
                    label="Star"
                />
                <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    value={entry?.title}
                    fullWidth
                    sx={{ ...regStyle }} />

                <Box sx={{ ml: 1 }}>
                    <div dangerouslySetInnerHTML={{ __html: entry.content }}></div>
                </Box>
                <Stack spacing={2} direction="row" sx={{ ...regStyle }}>
                    <Button variant="contained" onClick={() => navigate('/')}>Close</Button>
                </Stack>
        </Box>
    )
}

export default DiaryView