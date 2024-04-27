import {
  Box,
  Card,
  CardContent,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Login from './Login'
import { useState } from 'react'
import Register from './Register'

const Auth = () => {
  const theme = useTheme()
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: 'secondary.light' }}
    >
      <Card
        sx={{
          minWidth: 275,
          maxWidth: 500,
          borderRadius: 2,
          boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
          ':hover': {
            boxShadow: '0 2px 14px 0 rgb(32 40 45 / 18%)',
          },
          p: { xs: 2 },
        }}
      >
        {' '}
        <CardContent>
          {isLogin ? <Login setIsLogin={setIsLogin} /> : <Register setIsLogin={setIsLogin} />}
        </CardContent>
      </Card>
    </Box>
  )
}

export default Auth
