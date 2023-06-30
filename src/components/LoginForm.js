import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { Form, Button, Input } from 'antd';

import AuthContext from '../context/AuthProvider';

import './LoginForm.css';
import { RiErrorWarningLine } from 'react-icons/ri';

export default function LoginForm() {
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setAuth, setLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage('');
  }, [emailLogin, passwordLogin]);

  const login = async () => {
    try {
      const response = await axios.post('api/login', {
        email: emailLogin,
        password: passwordLogin
      });

      setAuth(response.data.authenticated);
      setLoggedInUser(response.data.loggedInUser);
      setEmailLogin('');
      setPasswordLogin('');
      setErrorMessage('');
      navigate('/');
    } catch ({ response }) {
      setErrorMessage(response.data.error);
    }
  };

  return (
    <>
      <Form
        layout='vertical'
        autoComplete='off'
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={login}
        onFinishFailed={(error) => {
          console.log(error);
        }}
      >
        <Form.Item
          name='email'
          label='Email'
          rules={[
            {
              required: true,
              message: 'Please enter an email'
            },
            {
              type: 'email',
              message: 'Please enter a valid email'
            }
          ]}
          hasFeedback
        >
          <Input placeholder='Type your email' onChange={e => setEmailLogin(e.target.value)} />
        </Form.Item>
        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please enter a password'
            }
          ]}
          hasFeedback
        >
          <Input.Password placeholder='Type your password' onChange={e => setPasswordLogin(e.target.value)} />
        </Form.Item>
        <div className='login-submit'>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type='primary' htmlType='submit'>
              Log In
            </Button>
          </Form.Item>
        </div>
        {
          errorMessage &&
          <div className='login-validation'>
            <RiErrorWarningLine />
            <h4>{errorMessage}</h4>
          </div>
        }
        <div className='redirect-register'>
          <h4>Don't have an account? <a href='/register'>Register</a></h4>
        </div>
      </Form >
    </>
  );
}