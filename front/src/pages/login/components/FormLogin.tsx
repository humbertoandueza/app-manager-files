import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../utils/ValidationSchemas";
import { LoginCredentials } from "../../../interfaces";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../redux/auth/actions';


import { login } from "../../../services/services"

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
})


const FormLogin = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const response = await login(data);
      if (response) {
          dispatch(setUser(response.user));
          navigate('/');
      }
  } catch (error) {
      console.error('Error registrando usuario:', error);
  }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
      style={{ width: "100%" }}
    >
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("email")}
        error={Boolean(errors.email)}
        helperText={errors.email?.message?.toString() ?? ""}
      />
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
      <BootstrapButton
        type="submit"
        variant="contained"
        disableRipple
        fullWidth
      >
        Sign in
      </BootstrapButton>
    </form>
  );
};

export default FormLogin;
