import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { Eye, EyeOff } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    role: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.auth)


  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, {
        fullname: input.fullname,
        email: input.email,
        phonenumber: input.phonenumber,
        password: input.password,
        role: input.role,
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/login')
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message || 'Something went wrong';
      toast.error(msg);
    } finally {
      dispatch(setLoading(false));
    }
  }
  return (
    <div>
      <Navbar />
      <div className='flex justify-center items-start max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className=' w-1/3 border border-gray-300 rounded-md p-4 my-16'>
          <h1 className='font-bold text-xl mb-10 flex justify-center'>Sign up</h1>
          <div>
            <Label>Full Name</Label>
            <Input type='text' placeholder='Enter your fullname' value={input.fullname} name='fullname' onChange={changeEventHandler}></Input>
          </div>
          <div>
            <Label>Email</Label>
            <Input type='email' placeholder='Enter your email' value={input.email} onChange={changeEventHandler} name='email'></Input>
          </div>
          <div>
            <Label>Phone no.</Label>
            <Input type='text' placeholder='Enter your Number' value={input.phonenumber} onChange={changeEventHandler} name='phonenumber'></Input>
          </div>
          <div className='flex gap-10 items-center'>
            <div className='mt-3 mb-2 flex gap-5'>
              <div className='flex gap-1'>
                <input type='radio' name='role' value='student' className='cursor-pointer' onChange={changeEventHandler} checked={input.role === 'student'} />
                <Label>Student</Label>
              </div>
              <div className='flex gap-1'>
                <input type='radio' name='role' value='recruiter' className='cursor-pointer' onChange={changeEventHandler} checked={input.role === 'recruiter'} />
                <Label>Recruiter</Label>
              </div>
            </div>
            {/* <div className='flex  items-center'>
              <input type='file'></input>
            </div> */}
          </div>

          <div className='relative'>
            <Label>Password</Label>
            <Input type={showPassword ? "text" : "password"} placeholder='Enter your password' value={input.password} onChange={changeEventHandler} name='password' />
            <button type='button' onClick={() => { setShowPassword(!showPassword) }} className='absolute right-4 top-5 translate-y-1/2'>{showPassword ? <EyeOff strokeWidth={0.75} /> : <Eye strokeWidth={0.75} />}</button>
          </div>
          {
            loading ? <Button className='mt-3 w-full'><Loader2 className=' mr-2 w-4 h-4 animate-spin' /> Please Wait</Button> : <Button className='mt-3 w-full'>Login</Button>
          }
          <h4 className='text-sm mt-1 flex justify-center'>Already have an account? <Link to='/login'> <span className='text-green-500 ml-1 font-bold underline underline-offset-1'> login</span></Link></h4>

        </form>
      </div>

    </div>
  )
}

export default Signup