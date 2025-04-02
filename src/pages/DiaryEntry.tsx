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

import { format } from 'date-fns/format';

import { DiaryEntryType, moodList, sampleDiary } from '../data/Diary';
import { StorageService } from '../service/StorageService';
import { Editor } from '@tinymce/tinymce-react';

export const toDateTimeLocalString = (date: Date) => {
    return format(date, 'yyyy-MM-dd\'T\'HH:mm:ss')
}

const regStyle = {
    m: 1,
    minWidth: '20em',
}

function DiaryEntry(props: any) {

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

    const save = () => {
        if (!entry) {
            return
        }
        if (entry.id === '') {
            storageService.addEntry(entry)
        } else {
            storageService.updateEntry(entry)
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
                        value={entry.mood ?? 0}
                        label="Mood"
                        onChange={(event) => {
                            entry.mood = event.target.value as number
                            setEntry({ ...entry })
                        }}
                    >
                        {moodList.map((item, index) => (
                            <MenuItem value={item.mood} key={index}>
                                <Box component='span' sx={{ fontSize: '1.6em' }}>
                                    {moodList[item.mood].icon}
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
                <FormControl sx={{ ...regStyle, minWidth: '5em' }} >
                    <InputLabel id="star-label">Star</InputLabel>
                    <Select
                        labelId="star-label"
                        id="star-select"
                        value={entry.star ?? 1}
                        label="Star"
                        onChange={(event) => {
                            entry.star = event.target.value as number
                            setEntry({ ...entry })
                        }}
                    >
                        {[1, 2, 3, 4, 5].map((item, index) => (
                            <MenuItem value={item} key={index}>
                                <Box component='span'>
                                    {item}
                                </Box>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
                <Box sx={{ ml: 1 }}>
                    <Editor
                        tinymceScriptSrc={`/tinymce/tinymce.min.js`}
                        onInit={(_evt: any, editor: any) => editorRef.current = editor}
                        value={entry?.content}
                        onEditorChange={(content: string) => {
                            entry.content = content
                            setEntry({ ...entry })
                        }}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'charmap', 'emoticons'
                            ],
                            toolbar: 'undo redo fullscreen | bold italic underline cut copy paste | link unlink strikethrough superscript subscript | ' +
                                'highlight forecolor backcolor removeformat search  | ' +
                                'align numlist bullist outdent indent image media | ' +
                                'styles fontsizeinput lineheight | ' +
                                'table hr charmap emoticons anchor | ' +
                                'detectverse code preview help',
                            toolbar_mode: 'sliding',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </Box>
                <Stack spacing={2} direction="row" sx={{ ...regStyle }}>
                    <Button variant="contained" onClick={() => navigate('/')}>Cancel</Button>
                    <Button variant="contained" onClick={() => save()}>Save</Button>
                </Stack>
            </form>
        </Box>
    )
}

export default DiaryEntry