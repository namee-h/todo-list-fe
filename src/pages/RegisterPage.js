import React from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secPassword, setSecPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== secPassword) {
        throw new Error("Passwords do not match");
      }
      const response = await api.post("/user", { name, email, password });
      console.log("Registration successful:", response.data);
      if (response.data.status === "success") {
        setError("");
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      } else {
        throw new Error(response.data.error || "Registration failed");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  if (user) {
    navigate("/");
  }
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      {error && (
        <Typography color="error" align="center" my={2}>
          {error}
        </Typography>
      )}
      <Box
        onSubmit={handleSubmit}
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" component="h1" align="center">
          회원가입
        </Typography>

        <InputTextField
          required
          fullWidth
          label="Name"
          name="name"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />

        <InputTextField
          required
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputTextField
          required
          fullWidth
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />

        <InputTextField
          required
          fullWidth
          label="Re-enter the Password"
          name="confirmPassword"
          type="password"
          variant="outlined"
          onChange={(e) => setSecPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ mt: 2, backgroundColor: "#add8e6" }}
        >
          회원가입
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;

const InputTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#add8e6",
    },
  },
}));
