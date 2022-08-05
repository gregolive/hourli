import { useState, useRef, ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import AuthButtons from '../AuthButtons';

interface ServerError {
  email?: string;
  password?: string;
};

const Login = (): ReactElement => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const form = useRef();
  const [formError, setFormError] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [inputError, setInputError] = useState({
    email: '',
    password: '',
  });
  const [submitError, setSubmitError] = useState<ServerError>({});
  const [loading, setLoading] = useState(false); 

  const buildFormData = () => {
    const formData = new FormData();
    formData.append('email', userData.email);
    formData.append('password', userData.password);

    return formData;
  };

  const updateSubmitError = (msg: string): void => {
    const err = (msg === 'Email not found') ? { email: 'Email not found' } : { password: 'Incorrect password' };
    setSubmitError(err);
  };

  const formSubmit = (): void => {
    const formData = buildFormData();
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/login`;
    const config = { headers: { 'content-type': 'multipart/form-data' }, withCredentials: true };

    axios.post(url, formData, config)
      .then((res) => {
        if (res.status === 200) {
          handleLogin();
          navigate('/');
        }
      }, (err) => {
        // format submit error with input key, server key is always 'message'
        updateSubmitError(err.response.data.msg.message);
        setLoading(false);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const validForm = (e.target as HTMLFormElement).checkValidity();
    if (!validForm) {
      setFormError(true);
      return;
    }
    setLoading(true);
    formSubmit();
  };

  const handleChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    setSubmitError({});
    setFormError(false);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validateInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { validity } = e.target;

    switch (true) {
      case validity['typeMismatch']:
        setInputError({ ...inputError, [e.target.name]: 'Please enter a valid email'});
        break;
      case validity['patternMismatch']:
        setInputError({ ...inputError, [e.target.name]: 'Password must be at least 6 characters long and contain an uppercase letter, number, and special character'});
        break;
      default:
        setInputError({ ...inputError, [e.target.name]: ''});
    }
  };

  return (
    (loading) ? (
      <CircularProgress className='!text-teal-500' />
    ) : (
      <div className='w-10/12 max-w-lg'>
        <h2 className='text-3xl pb-4'>Sign in</h2>
        
        <form className='grid gap-3' ref={form.current} onSubmit={handleSubmit} noValidate>
        <fieldset className='grid gap-1'>
            <label className='label' htmlFor='email'>
              Email
            </label>
            <input
              className={`input ${(inputError.email || submitError.email) && 'error'}`}
              type='email'
              id='email'
              name='email'
              value={userData.email}
              onChange={handleChange}
              onBlur={(e) => validateInput(e)}
              required
            />
            <small className={(inputError.email || submitError.email) ? 'text-red-600 dark:text-red-500' : 'hidden'}>
              {inputError.email || submitError.email}
            </small>
          </fieldset>
            
          <fieldset className='grid gap-1'>
            <label className='label' htmlFor='password'>
              Password
            </label>
            <input
              className={`input ${(inputError.password || submitError.password) && 'error'}`}
              type='password'
              id='password'
              name='password'
              value={userData.password}
              onChange={handleChange}
              onBlur={(e) => validateInput(e)}
              pattern='(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,}'
              required
            />
            <small className={(inputError.password || submitError.password) ? 'text-red-600 dark:text-red-500' : 'hidden'}>
              {inputError.password || submitError.password}
            </small>
          </fieldset>

          <button className='btn primary-btn primary-hover-btn' type='submit'>Sign in</button>

          {formError && <small className='text-red-600 dark:text-red-500'>Please fill in required fields with valid entries</small>}

          <p>
            Don't have an account? <Link to='/register' className='text-teal-500 hover:underline'>Sign up</Link>
          </p>
        </form>

        <hr className='border-t my-5 dark:border-gray-600' />

        <AuthButtons />
      </div>
    )
  );
};

export default Login;
