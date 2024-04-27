import {
    Box,
    Typography,
    Grid,
    Stack,
    Divider,
  } from '@mui/material'
  import { useTheme } from '@mui/material/styles'
  import Logo from '/logo.png'
  import FormRegister from './components/FormRegister'

  interface RegisterProps {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  const Register: React.FC<RegisterProps> = ({ setIsLogin }) => {
    const theme = useTheme()
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
                        Sign up
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
  
                  <Typography
                    sx={{ fontSize: 14, px: 2, }}
                    color="primary.dark"
                    gutterBottom
                  >
                    Sign up with Email address
                  </Typography>
  
                  <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormRegister />
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
                  <Typography variant="subtitle1" sx={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => setIsLogin(true)}>
                    Already have an account?
                    
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
    )
  }
  
  export default Register
  