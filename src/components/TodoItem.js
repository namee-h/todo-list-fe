import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Delete, CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";

const TodoItem = ({ item, deleteItem, toggleComplete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        mb: 2,
        backgroundColor: item.isComplete ? "#f5f5f5" : "white",
        border: `1px solid ${item.isComplete ? "#e0e0e0" : "#add8e6"}`,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: 2,
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 5,
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                textDecoration: item.isComplete ? "line-through" : "none",
                color: item.isComplete ? "#666" : "text.primary",
                fontWeight: item.isComplete ? "normal" : "medium",
              }}
            >
              {item.task}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                작성자:
              </Typography>
              <Chip
                label={item.author?.name || "알 수 없음"}
                size="small"
                sx={{
                  backgroundColor: "#add8e6",
                  color: "white",
                  fontSize: "0.75rem",
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 1,
              alignItems: "center",
            }}
          >
            {/* 삭제 버튼 */}
            <IconButton
              onClick={() => deleteItem(item._id)}
              sx={{
                color: "#ff6b6b",
                "&:hover": {
                  backgroundColor: "#ffebee",
                  color: "#d32f2f",
                },
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
            {/* 완료/미완료 토글 버튼 */}
            <Button
              variant={item.isComplete ? "outlined" : "contained"}
              size="small"
              onClick={() => toggleComplete(item._id)}
              startIcon={
                item.isComplete ? (
                  <RadioButtonUnchecked fontSize="small" />
                ) : (
                  <CheckCircle fontSize="small" />
                )
              }
              sx={{
                backgroundColor: item.isComplete ? "transparent" : "#add8e6",
                color: item.isComplete ? "#666" : "white",
                borderColor: item.isComplete ? "#666" : "#add8e6",
                "&:hover": {
                  backgroundColor: item.isComplete ? "#f0f0f0" : "#8bc5d6",
                  borderColor: item.isComplete ? "#666" : "#8bc5d6",
                },
                minWidth: isMobile ? "auto" : "100px",
              }}
            >
              {isMobile ? "" : item.isComplete ? "미완료" : "완료"}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
