import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getContents } from "../services/services";
import { CheckCircleOutline } from "@mui/icons-material";

function Detail() {
  const [contents, setContents] = useState<any>([]);
  const { id } = useParams()
  const [searchParams] = useSearchParams();
  const thematic = searchParams.get('thematic');
  const theme = createTheme({
    palette: {
      primary: {
        light: "#63b8ff",
        main: "#0989e3",
        dark: "#005db0",
        contrastText: "#000",
      },
      secondary: {
        main: "#4db6ac",
        light: "#82e9de",
        dark: "#00867d",
        contrastText: "#000",
      },
    },
  });

  const handleGetContents = async () => {
    try {
      const categoryId = id
      const themeticId = thematic
      const contents = await getContents(categoryId || '', themeticId || '')
      setContents(contents)
    } catch (error) {

    }
  }

  const getUrl = (url: string) => {
    const formatUrl = url.startsWith('public')
      ? `https://ll6zw4n2-3000.use2.devtunnels.ms/${url}`
      : url;

      return formatUrl
  }

  useEffect(() => {
    handleGetContents()
  }, [])

  return (
    <>
      {contents?.results?.length > 0 ? (
        <Grid  >
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

            {contents?.results?.map((content: any, index: number) => (
              <Grid item key={index} xs={12} sm={6} md={4} xl={2}>
                <div onClick={() => { }}>
                  <a href={getUrl(content.url)} target="_black">
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <CheckCircleOutline />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={content.title} secondary={new Date(content.createdAt).toLocaleDateString()} />
                    </ListItem>
                  </a>
                </div>
              </Grid>
            ))}
          </List>

        </Grid>
      ) : (
        <Typography align='left' color="error" sx={{
          my: 3,
          fontSize: 20,
          fontWeight: 'medium',
          fontFamily: 'Poppins',
          fontStyle: 'italic',
        }}>
          Data not found
        </Typography>
      )}
    </>
  )
}
export default Detail;
