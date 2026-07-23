import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {  LogOutIcon, Search, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Login from '../auth/Login'
import SearchDropdown from './SearchDropdown'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'


const Navbar = () => {
    const {user}=useSelector(store=>store.auth)
    const [openSearch, setOpenSearch] = useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const logoutHandler= async (e)=>{
        try{
            const res=await axios.post(`${USER_API_END_POINT}/logout`,{withCredentials:true})
            if(res.data.success){
                dispatch(setUser(null));
                toast.success(res.data.message)
                navigate("/")

            }


        }
        catch(err){
            console.log(err)
            toast.error(err.response?.data?.message||"something went wrong")

        }
    }

    return (
        <div className="bg-white ">
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 py-4'>
                <div>
                    <Link to={"/"}><h1 className='text-2xl font-bold'>We<span className='bg-gradient-to-r bg-clip-text text-transparent from-green-500 to-green-600'>Hire</span></h1></Link>

                </div>



                <div className='flex items-center gap-10'>
                    <button onClick={() => setOpenSearch(!openSearch)} className="flex items-center gap-20 border border-gray-400 text-gray-600  px-2 py-1 rounded-full">
                        Search Jobs Here <Search size={35} className='bg-green-600 rounded-full p-2  text-white' />
                    </button>
                    {openSearch && <SearchDropdown />}

                    <ul className='flex font-medium items-center gap-8'>
                        <Link to={"/"}><li>Home</li></Link>
                        <Link to={"/jobs"}><li>Jobs</li></Link>
                        <Link to={"/browse"}><li>Browse</li></Link>
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to='/login'><Button variant='outline'>Login</Button></Link>
                                <Link to='/signup'><Button className='bg-green-500 hover:bg-green-700'>signup</Button></Link>
                            </div>
                        )
                            : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="shadcn" className="object-cover" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="space-y-4">

                                            {/* User Info */}
                                            <div>
                                                <h4 className="font-semibold text-lg">{user?.fullname}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {user?.profile?.domain}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {user?.email}
                                                </p>
                                            </div>

                                            {/* Stats */}
                                            <div className="grid grid-cols-2 gap-4 border-y py-3">
                                                <div>
                                                    <p className="text-lg font-bold">12</p>
                                                    <p className="text-xs text-muted-foreground">Applications</p>
                                                </div>
                                                <div>
                                                    <p className="text-lg font-bold">8</p>
                                                    <p className="text-xs text-muted-foreground">Saved Jobs</p>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex flex-col gap-2">
                                                <Link to='/profile'><Button variant="outline" className='w-full'><User2 /> View Profile</Button></Link>
                                                <Button onClick={logoutHandler}><LogOutIcon/>Log out</Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar