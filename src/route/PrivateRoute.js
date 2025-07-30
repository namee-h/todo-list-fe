import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import useAuthStore from "../stores/authStore";

const PrivateRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  // 토큰이 없으면 로그인 페이지로
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 토큰은 있지만 user 정보를 아직 가져오는 중이면 로딩
  if (user === null) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress sx={{ color: "#add8e6" }} />
      </Box>
    );
  }

  // user 정보가 있으면 자식 컴포넌트 렌더링
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
