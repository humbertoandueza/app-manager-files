import { Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainCard from '../components/MainCard';
import useAuth from '../hooks/useAuth';
import { getThematics } from '../services/services';

function Home() {
  const [thematics, setThematics] = useState<any>([]);
  const [thematicsClone, setThematicsClone] = useState<any>([]);

  const [filter, setFilter] = useState('');

  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  const handleCardClick = (category: any,thematic:any) => {
    if (!isAuthenticated) {
      navigate("/auth");
    } else {
      navigate(`/detail/${category.category._id}?thematic=${thematic._id}`);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log('data: ', data);
  }

  
  const handleGetThematics = async () => {
    try {
      const thematics = await getThematics()
      setThematics(thematics)
      setThematicsClone(thematics)
    } catch(error) {

    }
  }

  useEffect(()=>{
    handleGetThematics()
  },[])

  useEffect(()=>{
    if(filter.length){
      const filterClone = thematicsClone.filter((item:any)=>item?.thematic?.name?.toLowerCase().indexOf(filter) >= 0)
      setThematics(filterClone)
    }else {
      setThematics(thematicsClone)
    }
  },[filter])

  return (
    <Grid
      sx={{
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <div style={{ display: ' flex', justifyContent: 'end', width: '100%' }}>
          <TextField
            label="Filter by thematic"
            variant="outlined"
            fullWidth
            margin="normal"
            value={filter}
            style={{  width: '280px' }}
            onChange={(e) => setFilter(e.target.value)}
          />
      </div>
      {thematics.map(({ thematic, categories }:any,index:number) => (
        <div key={thematic._id}>
          {thematic && (
            <Typography align='left' color="primary.dark" sx={{
              my: 3,
              fontSize: 24,
              fontWeight: 'medium',
              fontFamily: 'Poppins',
              fontStyle: 'italic',
            }}>
              {thematic.name}
            </Typography>
          )}
          {categories?.length > 0 ? (
            <Grid container spacing={4} >
              {categories.map((category:any,index:number) => (
                <Grid item key={index} xs={12} sm={6} md={4} xl={2}>
                  <div onClick={() => handleCardClick(category,thematic)}>
                    <MainCard data={category} />
                  </div>
                </Grid>
              ))}
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
        </div>
      ))}
    </Grid>
  )
}
export default Home;
