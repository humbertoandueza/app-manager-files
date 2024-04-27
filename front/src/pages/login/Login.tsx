import {
  Box,
  Typography,
  Grid,
  Stack,
  Divider,
  Button,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Logo from '/logo.png'
import FormLogin from './components/FormLogin'
import { useNavigate } from 'react-router-dom';


interface LoginProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsLogin }) => {
  const theme = useTheme()
  const navigate = useNavigate();


  const goToHome = () => {
    navigate('/')
  }
  return (

    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item sx={{ mb: 1 }}>
        <img
          src={Logo}
          alt="logo"
          width={100}
          height={100}
          style={{ marginTop: 8 }}
        />
      </Grid>

      <Grid item xs={12}>
        <Grid
          container
          direction={'row'}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <Typography
                variant="h3"
                sx={{ fontSize: 24 }}
                color="primary.main"
                gutterBottom
              >
                Hi, Welcome Back
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

          <Button
            variant="outlined"
            sx={{
              cursor: 'pointer',
              m: 2,
              py: 0.5,
              px: 7,
              fontWeight: 500,
            }}
            onClick={() => goToHome()}
          >
            EXPLORE
          </Button>

          <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          sx={{ fontSize: 14, px: 2, }}
          color="primary.dark"
          gutterBottom
        >
          Sign in with Email address
        </Typography>
        <FormLogin />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          xs={12}
        >
          <Typography variant="subtitle1" sx={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => setIsLogin(false)}>
            Dont have an account?
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Login
