import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { NotebookTabs } from 'lucide-react'

const ApplicationJobTable = () => {
    const appliedJobs=[1,2,3,4,5];
    return (
        <div className='w-full bg-white  rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex items-center gap-2 p-4'>
                <NotebookTabs size={16} color="#bababa" strokeWidth={1.75} />
                <h1 className='font-semibold'>Applied Jobs</h1>

            </div>
            
            <Table>
                <TableCaption>A list of your Applied Jobs.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        appliedJobs.map((job,index)=>{
                            return(
                                <TableRow key={index}>
                                    <TableCell className="font-medium">12/12/2023</TableCell>
                                    <TableCell>Frontend Developer</TableCell>
                                    <TableCell>Google</TableCell>
                                    <TableCell className="text-right">Applied</TableCell>
                                </TableRow>
                            )
                        })

                    }
                </TableBody>
            </Table>
        </div>

    )
}

export default ApplicationJobTable