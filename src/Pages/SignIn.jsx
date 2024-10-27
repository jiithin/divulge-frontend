import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SignInStart,SignInSuccess,SignInFailure } from '../redux/user/userSlice'
import OAuth from '../Components/OAuth'
import { DIVULGE } from "../serverUrl.js"

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(SignInFailure('Please fill all the fields'));
    }
    try {
      dispatch(SignInStart());
      const res = await fetch(`${DIVULGE}/blog/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(SignInFailure(data.message));
      }

      if (res.ok) {
        dispatch(SignInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(SignInFailure(error.message));
    }
  }
  return (
    
    <div className='min-h-screen mt-20 font-Montserrat'>
      
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>

        {/* left */}
        <div className='flex-1'>
          <Link to='/sign-in'>
          <p className=' text-7xl font-ElsieSwash font-bold py-3 text-center'> <span className='text-transparent bg-clip-text bg-gradient-to-l to-teal-300 via-purple-500 from-blue-400'>Sign In</span></p>
            
          </Link>
          <p className='font-semibold text-center text-xl text-transparent bg-clip-text bg-gradient-to-r to-blue-300 from-purple-400 opacity-80'>Sign In with your existing email.</p>
          <p className='font-semibold text-center text-base text-transparent bg-clip-text bg-gradient-to-r to-blue-300 from-purple-400 opacity-45'>Sign In with your existing email.</p>
          <p className='font-semibold text-center text-sm text-transparent bg-clip-text bg-gradient-to-r to-blue-300 from-purple-400 opacity-25'>Sign In with your existing email.</p>
          <p className='font-semibold text-center text-xs text-transparent bg-clip-text bg-gradient-to-r to-blue-300 from-purple-400 opacity-15'>Sign In with your existing email.</p>
        </div>

        {/* right */}
        <div className='flex-1 px-5'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Email' className='text-indigo-800 dark:text-indigo-400'/>
              <TextInput
                type='email'
                placeholder='example@mail.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your Password' className='text-indigo-800 dark:text-indigo-400'/>
              <TextInput
                type='password'
                placeholder='password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
            className='bg-gradient-to-l to-blue-400 via-purple-500 from-teal-200'
              type='submit'
              disabled={loading}
              > 
                 {
                  loading?(
                  <>
                  <Spinner size='sm' color='success'/>
                    <span className='pl-3'>Loading...</span>
                  </>
                    
                  )
                  :'Sign In'
                }
            </Button>
            <OAuth/>
            </form>

            <div className='flex gap-2 text-sm mt-5 text-gray-500 dark:text-gray-400'>
            <span>Don't have an account?</span>
            <Link to='/sign-up' className=' text-purple-400 dark:text-purple-400 font-Montserrat font-bold'>
              Create an account.
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5 'color='failure'>
                {errorMessage}
              </Alert>
            )
          }

        </div>
        </div>
        </div>
  )
}

export default SignIn