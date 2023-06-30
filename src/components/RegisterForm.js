import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { Form, Button, Input } from 'antd';

import AuthContext from '../context/AuthProvider';

import './RegisterForm.css';
import { RiErrorWarningLine } from 'react-icons/ri';

export default function RegisterForm() {
  const [usernameRegister, setUsernameRegister] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setAuth, setLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage('');
  }, [usernameRegister, emailRegister, passwordRegister]);

  const register = async () => {
    try {
      const response = await axios.post('api/register', {
        username: usernameRegister,
        email: emailRegister,
        passwordRegister: passwordRegister
      });

      setAuth(response.data.authenticated);
      setLoggedInUser(response.data.loggedInUser);
      setUsernameRegister('');
      setEmailRegister('');
      setPasswordRegister('');
      setErrorMessage('');
      navigate('/');
    } catch ({ response }) {
      setErrorMessage(response.data.message);
    }
  };

  return (
    <>
      <Form
        layout='vertical'
        autoComplete='off'
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={register}
        onFinishFailed={(error) => {
          console.log(error);
        }}
      >
        <Form.Item name='user_name'
          label='Username'
          rules={[
            {
              required: true,
              message: 'Please enter a username'
            },
            {
              whitespace: true,
              message: 'Please enter a username'
            },
            {
              min: 6,
              message: 'Username must be at least 6 characters'
            }
          ]}
          hasFeedback
        >
          <Input placeholder='Type your username' onChange={e => setUsernameRegister(e.target.value)} />
        </Form.Item>
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
          <Input placeholder='Type your email' onChange={e => setEmailRegister(e.target.value)} />
        </Form.Item>
        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please enter a password'
            },
            {
              min: 8,
              message: 'Password must be at least 8 characters'
            }
          ]}
          hasFeedback
        >
          <Input.Password placeholder='Type your password' onChange={e => setPasswordRegister(e.target.value)} />
        </Form.Item>
        <Form.Item
          name='confirmPassword'
          label='Confirm Password'
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The password confirmation does not match');
              }
            })
          ]}
          hasFeedback>
          <Input.Password placeholder='Confirm your password' />
        </Form.Item>
        <div className='register-submit'>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type='primary' htmlType='submit'>
              Register
            </Button>
          </Form.Item>
        </div>
        {
          errorMessage &&
          <div className='register-validation'>
            <RiErrorWarningLine />
            <h4>{errorMessage}</h4>
          </div>
        }
        <div className='redirect-login'>
          <h4>Already have an account? <a href='/login'>Log In</a></h4>
        </div>
      </Form >
    </>
  );
}