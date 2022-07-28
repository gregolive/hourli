import { useState, useRef, ReactElement } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

interface ServerError {
  email?: string;
  password?: string;
};

const Register = (): ReactElement => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [inputError, setInputError] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [submitError, setSubmitError] = useState<ServerError>({});

  const buildFormData = () => {
    const formData = new FormData();
    formData.append('email', userData.email);
    formData.append('password', userData.password);

    return formData;
  };

  const formSubmit = (): void => {
    const formData = buildFormData();
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/register`;
    const config = { headers: { 'content-type': 'multipart/form-data' } };

    axios.post(url, formData, config)
      .then((res) => {
        console.log(res.data)
        //onLogin(res.data);
      }, (err) => {
        setSubmitError(err.response.data.msg);
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
    setFormError(false);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validateInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { validity } = e.target;

    switch (true) {
      case validity['typeMismatch']:
        setInputError({ ...inputError, [e.target.name]: `Please enter a valid ${e.target.name}` });
        break;
      case validity['patternMismatch']:
        if (e.target.name === 'password') {
          setInputError({ ...inputError, [e.target.name]: 'Password must be at least 6 characters long and contain an uppercase letter, number, and special character' });
          break;
        }
        setInputError({ ...inputError, [e.target.name]: 'Passwords must match' });
        break;
      default:
        setInputError({ ...inputError, [e.target.name]: '' });
    }
  };
  
  return (
    (loading) ? (
      <CircularProgress className='!text-teal-500' />
    ) : (
      <div className='w-10/12 max-w-lg'>
        <h2 className='text-3xl pb-4'>Create Account</h2>
        
        <form className='grid gap-3' ref={form.current} onSubmit={handleSubmit} noValidate>
          <fieldset className='grid gap-1'>
            <label>Confirm Password</label>
            <input
              className='input'
              type='email'
              id='email'
              name='email'
              value={userData.email}
              onChange={handleChange}
              onBlur={(e) => validateInput(e)}
              required
            />
          </fieldset>
            
          <fieldset className='grid gap-1'>
            <label>Password</label>
            <input
              className='input'
              type='password'
              id='password'
              name='password'
              value={userData.password}
              onChange={handleChange}
              onBlur={(e) => validateInput(e)}
              required
            />
          </fieldset>

          <fieldset className='grid gap-1'>
            <label>Confirm Password</label>
            <input
              className='input'
              type='password'
              id='passwordConfirmation'
              name='passwordConfirmation'
              value={userData.passwordConfirmation}
              onChange={handleChange}
              onBlur={(e) => validateInput(e)}
              required
            />
          </fieldset>
        </form>
      </div>
    )
  );
};

export default Register;
