import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, ListCollapse, MoveUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Job = ({job}) => {
    const navigate = useNavigate();
    
    return (
        <div className='flex flex-col justify-between relative p-4  shadow-xl h-[360px] w-[340px] rounded-xl'>
            <div className=' h-[270px] rounded-md bg-pink-100'>
                <div className='flex item-center justify-between p-2'>
                    <h1 className='text-sm font-semibold ml-2'>2 days ago</h1>
                    <Bookmark strokeWidth={1} className='cursor-pointer' />
                </div>
                <h1 className='text-4xl font-semibold ml-5 mt-4 '>{job?.title}</h1>
                <h3 className='text-sm ml-5 mt-2 text-slate-700'>{job?.description}</h3>
                <div className=" ml-2 mt-2 p-2 flex gap-2">
                    <Badge variant="ghost" className='border border-black'>{job?.salary}</Badge>
                    <Badge variant='ghost' className='border border-black'>{job?.jobtype}</Badge>
                    <Badge variant='ghost' className='border border-black'>{job?.location}</Badge>
                </div>

            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <img src='data:image/jpeg;base64,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' className='h-12 w-12 rounded-full ml-2' />
                </div>
                <div className=" flex gap-2">
                    <Button onClick={()=>navigate(`/details/${job?._id}`)} variant='outline'> <ListCollapse strokeWidth={1} />Details</Button>
                    <Button className='rounded-lg'>Apply <MoveUpRight strokeWidth={2} /></Button>
                </div>
            </div>
        </div>
    )
}

export default Job;