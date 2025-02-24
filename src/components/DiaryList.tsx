import { createSearchParams, useNavigate } from "react-router";

import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';

import { moodList } from "../data/Diary";

export function DiaryItem(props: any) {
    const { item } = props

    const navigate = useNavigate()

    //console.log(item)
    //console.log(moodList[item.mood - 1].icon)
    const icon = moodList[item.mood - 1].icon//icons[item.mood]
    return (
        <Card variant="outlined" sx={{ my: 0.2, px: 0.5, mb: 0.5, minWidth: 275 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid container spacing={2}>
                        <Grid size={4}>
                            <Box sx={{ fontSize: '2em' }}>{icon}</Box>
                        </Grid>
                        <Grid size={7} justifyContent='left' alignItems='flex-start'>
                            <Typography sx={{ mt: 1, justifyContent: 'flex-start' }}>{item.date.toLocaleString()}</Typography>
                            <Typography>{item.title}</Typography>
                        </Grid>
                        <Grid size={1}>
                            <IconButton onClick={() => navigate({ pathname: 'diaryentry', search: createSearchParams({ id: item.id }).toString()}) } > <EditIcon /></IconButton>
                    </Grid>
                    <Grid size={12}>
                        <Typography>{item.content}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
        </Card >
    )
}

function DiaryList(props: any) {
    return (
        <Box sx={{ p: 1 }}>
            {props.items.map((item: any, index: number) => (
                <DiaryItem key={index} item={item} />
            ))}
        </Box>
    )
}

export default DiaryList