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
import { Building2, Edit2, MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSerchCompanyByText } from '@/redux/companySlice';

const AdminApplicationTabel = () => {
    const { allCompany, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(allCompany);
    const navigate = useNavigate();


    useEffect(() => {
        const filteredCompany = allCompany.length >= 0 && allCompany.filter((company) => {
            if (!searchCompanyByText) return true;
            
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterCompany(filteredCompany)
    }, [allCompany, searchCompanyByText])

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
                        <TableHead className="w-[100px]">Logo</TableHead>
                        <TableHead className='px-20'>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany.length <= 0 ? <TableCell colSpan={4} className="text-center">
                            No company registered yet.
                        </TableCell> : (
                            <>
                                {
                                    filterCompany.map((company) => (
                                        <TableRow key={company._id}>
                                            <TableCell className="font-medium">
                                                <Avatar>
                                                    <AvatarImage src={company.logo} alt="shadcn" className="object-cover" />
                                                </Avatar>
                                            </TableCell>
                                            <TableCell className='px-20'>{company.name}</TableCell>
                                            <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                            <TableCell className='text-right cursor-pointer'>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger>
                                                        <Button variant="ghost" size="icon" className="size-8"><MoreHorizontal /><span className="sr-only">Open menu</span></Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem className='cursor-pointer' onClick={() => navigate(`/admin/company/${company._id}`)}> <Edit2 strokeWidth={1.75} /> Edit</DropdownMenuItem>
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

export default AdminApplicationTabel
