import { Button, Grid, IconButton, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import { styled, Theme, useTheme } from "@mui/material/styles";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../utils/ValidationSchemas";
import { RegisterData, Roles } from "../../../interfaces";
import { useState } from "react";
import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import { authRegister } from "../../../services/services"
import { setUser } from '../../../redux/auth/actions';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';


const BootstrapButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    marginTop: 10,
    color: "white",
    lineHeight: 2,
    borderColor: "#0063cc",
    fontFamily: ["Roboto"].join(","),
    "&:hover": {
        backgroundColor: "#42D3D8",
        borderColor: "#42D3D8",
        boxShadow: "none",
    },
    "&:active": {
        boxShadow: "none",
        backgroundColor: "#0062cc",
        borderColor: "#005cbf",
    },
    "&:focus": {
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
});


const FormLogin = () => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const names = Object.values(Roles);

    function getStyles(name: string, personName: string[], theme: Theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data: RegisterData) => {
        try {
            const response = await authRegister(data);
            if (response) {
                dispatch(setUser(response.user));
                navigate('/');
            }
        } catch (error) {
            console.error('Error registrando usuario:', error);
        }
    }

    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),

    });
    return (
        <form
            onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
            style={{ width: "100%" }}
        >
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={12}>
                    <Select
                        fullWidth
                        {...register("role")}
                    >
                        <MenuItem value={'creador'}>Creador</MenuItem>
                        <MenuItem value={'lector'}>Lector</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register("name")}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message?.toString() ?? ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register("email")}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message?.toString() ?? ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register("password")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message?.toString() ?? ""}
                    />
                </Grid>
            </Grid>
            <BootstrapButton
                type="submit"
                variant="contained"
                disableRipple
                fullWidth
            >
                Sign up
            </BootstrapButton>
        </form>
    );
};

export default FormLogin;
