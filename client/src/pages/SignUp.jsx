import React, { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   try {
    setLoading(true);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log(data);
 
    if(data.success===false){
      setError(data.message);
      setLoading(false)
      return;
    }
    setLoading(false);
    setError(null);
    navigate("/signIn")
    
   } catch (error) {
    setLoading(false);
    setError(error.message);
   }
  };



  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="text"
          placeholder='Username'
          id='username'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder='Email'
          id='email'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder='Password'
          id='password'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <button disabled={loading}
          className='bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          type='submit'
        >
          {loading ? 'loading...' : 'sign up'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <NavLink to={"/signIn"}>
          <span className='text-blue-700'>Sign In</span>
        </NavLink>
      </div>  
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
};

export default SignUp;
