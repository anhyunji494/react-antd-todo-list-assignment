import React, { useState } from 'react';
import { Flex, List, Input, Checkbox, Space, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const boxStyle = {
  width: '100%',
  height: '100vh',
};

const App = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, text: '환경 설정하기', completed: false },
    { id: 2, text: '구조 구상하기', completed: false },
  ]);
  const [current, setCurrent] = useState('');

  const onChange = (e) => {
    setCurrent(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (current.trim().length > 0) {
        const newTodo = {
          id: Date.now(),
          text: current.trim(),
          completed: false,
        };
        setTodoList([...todoList, newTodo]);
        setCurrent('');
      }
    }
  };

  const toggleTodo = (id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <Flex style={boxStyle} justify="center" align="center">
      <div style={{ width: '300px', margin: '30px auto' }}>
        <Flex vertical>
          <List
            header={'Todo List'}
            bordered
            dataSource={todoList}
            renderItem={(todo) => (
              <List.Item
                actions={[
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => deleteTodo(todo.id)}
                  />,
                ]}
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                >
                  <span
                    style={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                    }}
                  >
                    {todo.text}
                  </span>
                </Checkbox>
              </List.Item>
            )}
            style={{
              marginBottom: '16px',
            }}
          />
          <Input
            value={current}
            placeholder="투두리스트를 작성하세요."
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </Flex>
      </div>
    </Flex>
  );
};

export default App;
