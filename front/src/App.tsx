import { Box, Paper, CssBaseline, ThemeProvider } from '@mui/material'
import { Provider, useSelector, useDispatch } from 'react-redux';
import store, { RootState } from './store/index';
import { createTheme } from '@mui/material/styles'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from 'react-router-dom'
import { routes as appRoutes } from './routes'
import Navbar from './components/Navbar'
// eslint-disable-next-line import/no-named-as-default
import Footer from './components/Footer'
import NotFound from './pages/NotFound'
import Home from './pages/Home'

function Layout() {
  const location = useLocation()
  const showNavAndFooter = location.pathname !== '/auth'
  const isUser = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

  return (
    <Box height="100vh" display="flex" flexDirection="column" width="100vw" >
      {showNavAndFooter && <Navbar  isUser={isUser} dispatch={dispatch}/>}
      <Paper elevation={3} sx={{ flex: 1, backgroundColor: 'primary.light' }}>
        <Outlet />
      </Paper>
      {showNavAndFooter && <Footer />}
    </Box>
  )
}

export function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#ffffff',
        main: '#673ab7',
        dark: '#24292E',
        contrastText: '#000',
      },
      secondary: {
        light: '#EEF2F6',
        main: '#42D3D8',
        dark: '#007ba7',
        contrastText: '#000',
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              {appRoutes.map((route) => (
                <Route key={route.key} path={route.path} element={<route.component />} />
              ))}
              <Route index element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </Provider>

    </ThemeProvider>
  )
}

export function WrappedApp() {
  return <App />
}
