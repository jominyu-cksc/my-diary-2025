import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import FastfoodIcon from '@mui/icons-material/Fastfood';

export type DiaryEntry = {
    id: string,
    mood: number,
    date: Date,
    title: string,
    content: string,
}

export type MoodType = {
    mood: number,
    text: string,
    color?: string,
    icon?: any,
}

export const moodList: MoodType[] = [
    {
        mood: 1,
        text: 'Happy',
        icon: SentimentSatisfiedAltIcon,
    }, {
        mood: 2,
        text: 'Sad',
        icon: SentimentVeryDissatisfiedIcon,
    }, {
        mood: 3,
        text: 'Love',
        icon: FavoriteIcon,
    }, {
        mood: 4,
        text: 'Angry',
        icon: ElectricBoltIcon,
    }, {
        mood: 5,
        text: 'Hungry',
        icon: FastfoodIcon,
    }
]

export const sampleDiary: DiaryEntry[] = [
    {
        id: '1',
        mood: 1,
        date: new Date(),
        title: 'My first entry',
        content: 'My first entry din.'
    },
    {
        id: '2',
        mood: 4,
        date: new Date(),
        title: 'My first hunger',
        content: 'My first hunger din.'
    },
]