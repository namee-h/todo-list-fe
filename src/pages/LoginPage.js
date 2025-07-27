import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/user/login", { email, password });
      if (response.status === 200) {
        setUser(response.data.user);
        sessionStorage.setItem("token", response.data.token);
        api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
        setError("");
        navigate("/");
      }
      console.log("Login successful:", response);
      throw new Error(response.data.message || "Login failed");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: 400,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          로그인
        </Typography>

        <TextField
          fullWidth
          type="email"
          label="Email address"
          placeholder="Enter email"
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          placeholder="Password"
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Typography color="error" align="center" my={2}>
            {error}
          </Typography>
        )}
        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ height: "100%", backgroundColor: "#add8e6" }}
          >
            Login
          </Button>
        </Box>

        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            계정이 없다면?{" "}
            <MuiLink component={Link} to="/register" underline="hover">
              회원가입 하기
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
