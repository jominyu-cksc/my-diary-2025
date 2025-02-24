import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { blue, green, pink, red, yellow } from '@mui/material/colors';

export type DiaryEntryType = {
    id: string,
    mood: number,
    date: Date,
    title: string,
    content: string,
}

export type MoodType = {
    mood: number,
    text: string,
    icon?: any,
}

export const moodList: MoodType[] = [
    {
        mood: 1,
        text: 'Happy',
        icon: <SentimentSatisfiedAltIcon sx={{ color: yellow[700], fontSize: 'inherit' }} />,
    }, {
        mood: 2,
        text: 'Sad',
        icon: <SentimentVeryDissatisfiedIcon sx={{ color: blue[900], fontSize: 'inherit' }} />,
    }, {
        mood: 3,
        text: 'Love',
        icon: <FavoriteIcon sx={{ color: pink[500], fontSize: 'inherit' }} />,
    }, {
        mood: 4,
        text: 'Angry',
        icon: <ElectricBoltIcon sx={{ color: red[700], fontSize: 'inherit' }} />,
    }, {
        mood: 5,
        text: 'Hungry',
        icon: <FastfoodIcon sx={{ color: green[700], fontSize: 'inherit' }} />,
    }
]

export const sampleDiary: DiaryEntryType[] = [
    {
        id: '1',
        mood: 1,
        date: new Date(),
        title: 'My first entry',
        content: 'My first entry din.'
    },
    {
        id: '2',
        mood: 2,
        date: new Date(),
        title: 'My first sad entry',
        content: 'My first entry din.'
    },
    {
        id: '3',
        mood: 3,
        date: new Date(),
        title: 'My first entry',
        content: 'My first entry din.'
    },
    {
        id: '4',
        mood: 4,
        date: new Date(),
        title: 'My first hunger, silent h',
        content: 'My first hunger din.'
    },
    {
        id: '5',
        mood: 5,
        date: new Date(),
        title: 'My first hunger',
        content: 'My first hunger din.'
    },
]