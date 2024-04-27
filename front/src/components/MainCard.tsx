import {
    Avatar,
    Card,
    CardHeader,
    CardMedia
} from "@mui/material";

interface MainCardProps {
    data: any;
}



const MainCard: React.FC<MainCardProps> = ({ data }) => {
    console.log(data.category.coverImage)
    return (
            <Card sx={{
                cursor: 'pointer', boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
                ':hover': {
                    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 38%)',
                },
            }} >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'primary.main', fontSize: 14, width: 40, height: 40 }} aria-label="recipe">
                            {data.count}
                        </Avatar>
                    }
                    title={
                        <div style={{ display: 'flex', alignItems: 'center', textAlign: 'left', fontSize: 28 }}>
                            {data.category.name}
                        </div>
                    }
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={`https://ll6zw4n2-3000.use2.devtunnels.ms/public${data.category.coverImage}`}
                    alt="Paella dish"
                />

            </Card>
    )
}
export default MainCard;