import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState([]);

  const getTasks = async () => {
    const response = await api.get("/tasks");
    setTodoList(response.data.data);
  };

  const addTask = async () => {
    if (!todoValue) {
      alert("할 일을 입력해주세요.");
      return;
    }
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
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
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        console.log("삭제 성공");
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
        console.log("완료 처리 성공");
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
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        deleteItem={deleteItem}
        toggleComplete={toggleComplete}
      />
    </Container>
  );
}

export default App;
