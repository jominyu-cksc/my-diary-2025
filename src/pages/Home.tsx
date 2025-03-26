import { useNavigate } from 'react-router';

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

import DiaryList from '../components/DiaryList';
import { DiaryEntryType, sampleDiary } from '../data/Diary';
import { StorageService } from '../service/StorageService';
import { useEffect, useState } from 'react';

function Home(props: any) {

    const { db, auth } = props

    const [items, setItems] = useState<DiaryEntryType[]>([])
    
    const navigate = useNavigate()
    const storageService = new StorageService(auth, db)

    useEffect(() => {
        storageService.getEntries('').then(entries => {
            setItems(entries)
        })
    }, [])

    return (
        <header>
            <DiaryList items={items} />
            <Fab color="primary" aria-label="add" className='fab'
                sx={{ position: 'fixed', bottom: '24px', right: '24px' }}
                onClick={() => navigate('diaryentry')}>
                <AddIcon />
            </Fab>
        </header>
    )
}

export default Home