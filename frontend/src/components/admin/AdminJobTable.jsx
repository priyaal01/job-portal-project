import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Building2, Edit2, MoreHorizontal, User } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const AdminJobTabel = () => {
    const { allAdminJob, searchJobByText } = useSelector(store => store.job);
    const [filterJob, setFilterJob] = useState(allAdminJob);
    const navigate = useNavigate();
    


    useEffect(() => {
        const filteredJob = allAdminJob.length >= 0 && allAdminJob.filter((job) => {
            if (!searchJobByText) return true;

            return job?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
        })
        setFilterJob(filteredJob)
    }, [allAdminJob, searchJobByText ])

    return (
        <div className='w-full bg-white mt-10 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex items-center gap-2 p-4'>
                <Building2 size={16} color="#bababa" strokeWidth={1.75} />
                <h1 className='font-semibold'>Companies Registered</h1>
            </div>

            <Table>
                <TableCaption>A list of Companies Created.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='px-20'>Company Name</TableHead>
                        <TableHead className='px-20'>Job Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJob.length <= 0 ? <TableCell colSpan={4} className="text-center">
                            No Job is Created Yet.
                        </TableCell> : (
                            <>
                                {
                                    filterJob.map((job) => (
                                        <TableRow key={job._id}>
                                            <TableCell className='px-20'>{job?.company?.name}</TableCell>
                                            <TableCell className='px-20'>{job?.title}</TableCell>
                                            <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                                            <TableCell className='text-right cursor-pointer'>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger>
                                                        <Button variant="ghost" size="icon" className="size-8"><MoreHorizontal /><span className="sr-only">Open menu</span></Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem className='cursor-pointer' onClick={()=> navigate(`/admin/job/${job._id}/applicant`)} > <User /> Applicants</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </>
                        )
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobTabel
