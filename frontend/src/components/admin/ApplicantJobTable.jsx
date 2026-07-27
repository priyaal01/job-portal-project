import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
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
import { useSelector } from 'react-redux'
import { Check, MoreHorizontal, User, X } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const ApplicantJobTable = () => {
    const { applicants } = useSelector(store => store.application)
    const shortlistingStatus = ["Accepted", "Rejected"];

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.put(`${APPLICATION_API_END_POINT}/application/${id}`, {status},{ withCredentials: true });
            console.log(res.data)
            if (res.data.success) {
                toast.success(res.data.message)
            }

        }
        catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <Table>
                <TableCaption>A list of Users those have Applied to the Jobs.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Applicant Name</TableHead>
                        <TableHead>E-Mail</TableHead>
                        <TableHead>Phone-No</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((applicant) => (
                            <TableRow key={applicant._id}>
                                <TableCell className="font-medium">{applicant?.applicant?.fullname}</TableCell>
                                <TableCell>{applicant?.applicant?.email}</TableCell>
                                <TableCell>{applicant?.applicant?.phonenumber}</TableCell>
                                <TableCell >{applicant?.applicant?.createdAt.split('T')[0]}</TableCell>
                                <TableCell className='text-right cursor-pointer'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button variant="ghost" size="icon" className="size-8"><MoreHorizontal /><span className="sr-only">Open menu</span></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {
                                                shortlistingStatus.map((status, index) => (
                                                    <div key={index}>
                                                        <DropdownMenuItem onClick={()=>statusHandler(status,applicant?._id)} className='cursor-pointer' >{status}</DropdownMenuItem>
                                                    </div>
                                                ))
                                            }
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                <TableFooter>
                </TableFooter>
            </Table>

        </div>
    )
}

export default ApplicantJobTable