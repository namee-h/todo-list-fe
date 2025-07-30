import React, { useEffect, useState } from "react";
import { Container, Grid, TextField, Button, Box } from "@mui/material";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";

const TodoPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTasks = async () => {
    const response = await api.get("/tasks");
    console.log("response", response.data.data);
    setTodoList(response.data.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    addTask();
  };

  const addEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 엔터키 기본 동작 방지
      addTask();
    }
  };

  const addTask = async () => {
    // 중복 요청 방지
    if (isSubmitting) {
      return;
    }

    if (!todoValue.trim()) {
      alert("할 일을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post("/tasks", {
        task: todoValue.trim(),
        isComplete: false,
      });

      if (response.status === 200) {
        setTodoValue("");
        getTasks();
      } else {
        throw new Error("task can not be added");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTasks();
      } else {
        throw new Error("task can not be deleted");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id);

      const response = await api.put(`/tasks/${id}`, {
        isComplete: !task.isComplete,
      });

      if (response.status === 200) {
        getTasks();
      } else {
        throw new Error("task can not be marked as complete");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid size={{ xs: 12, sm: 10 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="할일을 입력하세요"
              value={todoValue}
              onChange={(e) => setTodoValue(e.target.value)}
              onKeyDown={addEnter}
              disabled={isSubmitting}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#add8e6",
                  },
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={isSubmitting}
              sx={{ height: "100%", backgroundColor: "#add8e6" }}
            >
              {isSubmitting ? "추가 중..." : "추가"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box mt={5}>
        <TodoBoard
          todoList={todoList}
          deleteItem={deleteItem}
          toggleComplete={toggleComplete}
        />
      </Box>
    </Container>
  );
};

export default TodoPage;
