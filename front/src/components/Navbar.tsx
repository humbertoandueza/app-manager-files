import MenuIcon from "@mui/icons-material/Menu";
import {
    Avatar,
    Badge,
    Box,
    Button,
    Container,
    IconButton,
    Link,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import React, { FC, ReactElement, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { clearUser } from '../redux/auth/actions';
import { routes } from "../routes";
import { logout } from "../services/services";
import Logo from '/logo.png';

interface NavbarProps {
    isUser: any;
    dispatch: any;
}


const Navbar: FC<NavbarProps> = ({ isUser, dispatch }): ReactElement => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const theme = useTheme()

    const isAuthenticated = useAuth();
    const { user, getMe } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            getMe()
        }
    }, [])


    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = async () => {
        try {
            await logout();
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            localStorage.removeItem('refresh_token');
            dispatch(clearUser());
            setAnchorEl(null);
            navigate('/auth');
        } catch (error) {
            console.error('Try Again', error);
        }
    };

    const StyledBadge = styled(Badge)(() => ({
        outline: '1px solid white',
        borderRadius: '50%',

        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },


        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "primary.dark",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box display="flex"
                        alignItems="center">
                        <img
                            src={Logo}
                            alt="logo"
                            width={50}
                            height={50}

                        />
                        <Typography
                            variant="h6"
                            noWrap
                            color="white"
                            sx={{
                                mx: 2,
                                display: { xs: "none", md: "flex" },
                            }}
                        >


                            Manager App
                        </Typography>
                    </Box>


                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            sx={{color:'white'}}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {routes.map((page) => (
                                <Link
                                    key={page.key}
                                    component={NavLink}
                                    to={page.path}
                                    color="black"
                                    underline="none"
                                    variant="button"
                                >
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.title}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        color="white"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                    >
                        Manager App
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                marginLeft: "1rem",
                                width: "100%",
                            }}
                        >
                            {
                                user?.role === 'admin' && (
                                    <>
                                    <Button href="/content" style={{width:'150px', margin: '0 10px'}} color="secondary" variant="contained">
                                        Create
                                    </Button>
                                        <Link
                                            href="/thematic"
                                            color="white"
                                            underline="none"
                                            variant="button"
                                            sx={{ fontSize: "large", margin: "1rem" }}
                                        >
                                            Thematic
                                        </Link>
                                        <Link
                                            href="/category"
                                            color="white"
                                            underline="none"
                                            variant="button"
                                            sx={{ fontSize: "large", margin: "1rem" }}
                                        >
                                            Category
                                        </Link>
                                    </>
                                )
                            }
                            <Link
                                href="/"
                                color="white"
                                underline="none"
                                variant="button"
                                sx={{ fontSize: "large", margin: "1rem" }}
                            >
                                Home
                            </Link>
                            {!isAuthenticated ?
                                <Link
                                    href="/auth"
                                    color="white"
                                    underline="none"
                                    variant="button"
                                    sx={{ fontSize: "large", margin: "1rem" }}
                                >
                                    Login
                                </Link> :
                                <>
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <span style={{ fontSize: 14, color: 'white' }}>{user?.name}</span>

                                            <StyledBadge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                variant="dot"
                                            >
                                                <Avatar alt="Remy Sharp" src="https://cdn.quasar.dev/img/boy-avatar.png" />
                                            </StyledBadge>
                                        </Stack>
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >

                                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                                    </Menu>
                                </>
                            }
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </Box>
    );
};

export default Navbar;