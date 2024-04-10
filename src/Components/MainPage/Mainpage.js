import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodosAction } from 'C:/Users/inuri/OneDrive/Рабочий стол/Redux/less/react-main/src/store/slise/todoSlise.js';
import { Modal, Button, Form, Input } from 'antd';

export default function MainPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [theme, setTheme] = useState('light');
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    if (isRegistered) {
      dispatch(fetchTodosAction());
    }
  }, [dispatch, isRegistered]);

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'light' ? 'white' : 'black';
    document.body.style.color = theme === 'light' ? 'black' : 'white';
  }, [theme]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    console.log('Received values of form: ', values);
    setIsModalVisible(false);
    setIsRegistered(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Регистрация
      </Button>
      <Button onClick={toggleTheme}>
        Сменить тему
      </Button>
      <Modal title="Регистрация" visible={isModalVisible} footer={null} onCancel={handleCancel}>
        <Form
          name="register"
          onFinish={handleOk}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}
          >
            <Input placeholder="Имя" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
          >
            <Input.Password placeholder="Пароль" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {isRegistered && (
        <div>
          {todos.map((todo) => (
            <div key={todo.id}>
              {todo.title}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
