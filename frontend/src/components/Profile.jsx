import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { Pen } from 'lucide-react'
import { useRef } from 'react'

const Profile = () => {
    const coverInputRef = useRef(null);
    const [coverPreview, setcoverPreview] = useState("");

    const handleCoverChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setcoverPreview(URL.createObjectURL(file));
        }
    }
    return (
        <div>
            <Navbar />
            <div className="relative">
                <div className=" max-w-7xl mx-auto mt-5 h-56 rounded-xl bg-gradient-to-r from-violet-600 via-purple-500 to-blue-500">
                    <img src={ coverPreview || "https://images.unsplash.com/photo-1506744038136-46273834b3fb"} alt='' className='w-full h-56 object-cover' />
                    <input
                        type="file"
                        accept="image/*"
                        ref={coverInputRef}
                        className="hidden"
                        onChange={handleCoverChange}

                    />
                    <button onClick={() => coverInputRef.current.click()}><Pen strokeWidth={2} className='absolute top-6 right-40 text-white' /></button>
                </div>

                <img
                    src='https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHVzZXJ8ZW58MHx8MHx8fDA%3D'
                    alt=""
                    className="w-36 h-36 rounded-full border-4 border-white object-cover absolute left-40 -bottom-16"
                />
            </div>

            {/* <Footer/> */}
        </div>
    )
}

export default Profile