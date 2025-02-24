import { useNavigate } from 'react-router';

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

import DiaryList from '../components/DiaryList';
import { sampleDiary } from '../data/Diary';

function Home() {
    const items = sampleDiary
    
    const navigate = useNavigate()

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