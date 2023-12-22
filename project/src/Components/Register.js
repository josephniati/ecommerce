import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const history = useNavigate();

  const [user, setUser] = useState({
    companyName: '',
    email: '',
    phone: '',
    password: '',
    cpassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (user.password !== user.cpassword) {
      window.alert("Passwords don't match. Please check and try again.");
      return;
    }

    try {
      const response = await axios.post(
        'https://5000-josephniati-ecommerce-vz2lk500dwi.ws-us107.gitpod.io/adminRegister',
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Axios response:', response.data); // Log the response for debugging

      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        window.alert('Registration Successful');
        history.push('/');
      } else {
        console.error('Registration failed. HTTP status:', response.status);
        window.alert('Registration Failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      window.alert('Registration Failed. Please try again later.');
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-12 col-md-7 col-sm-6'>
          <h1>Welcome!</h1>
        </div>
        <div className='col-12 col-md-5 col-sm-6'>
          <form onSubmit={handleRegister}>
            <div className='form-group'>
              <label htmlFor='companyName'>Company Name</label>
              <input
                type='text'
                className='form-control'
                id='companyName'
                name='companyName'
                placeholder='Enter your company name'
                value={user.companyName}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                placeholder='Enter your Email'
                value={user.email}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='phone'>Phone No.</label>
              <input
                type='tel'
                className='form-control'
                id='phone'
                name='phone'
                placeholder='Enter your Phone No.'
                value={user.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                placeholder='Enter your Password'
                value={user.password}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='cpassword'>Confirm password</label>
              <input
                type='password'
                className='form-control'
                id='cpassword'
                name='cpassword'
                placeholder='Confirm password'
                value={user.cpassword}
                onChange={handleInputChange}
              />
            </div>

            <NavLink to='/login'>Already Registered, then Login here!</NavLink>
            <br />
            <br />
            <button type='submit' className='btn btn-primary' id='register' name='register'>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

