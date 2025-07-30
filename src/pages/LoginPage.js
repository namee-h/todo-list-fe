import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import useAuthStore from "../stores/authStore";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/user/login", { email, password });

      if (response.status === 200) {
        const { token, user } = response.data;

        // 상태 저장
        setToken(token);
        setUser(user);

        setError("");
        navigate("/");
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  };
  if (user) {
    navigate("/");
  }

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          placeholder="Password"
          margin="normal"
          value={password}
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
