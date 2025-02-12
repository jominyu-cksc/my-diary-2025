import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import { pink } from "@mui/material/colors"
import HomeIcon from '@mui/icons-material/Home';

export function DiaryItem(props: any) {
    const { item } = props
    return (
        <Card variant="outlined" sx={{ my: 0.2, px: 0.5 }}>
            <HomeIcon sx={{ color: pink[500] }} />
            <Typography>{item.date.toLocaleString()}</Typography>
            <Typography>{item.title}</Typography>
        </Card>
    )
}

function DiaryList(props: any) {
    return (
        <>
            {props.items.map((item: any, index: number) => (
                <DiaryItem key={index} item={item} />
            ))}
        </>
    )
}

export default DiaryList