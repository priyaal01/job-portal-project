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
import { useSelector } from 'react-redux'

const ApplicationJobTable = () => {
    const {applications} = useSelector(store=>store.application)
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
                        <TableHead className="w-[200px]">Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applications.map((application)=>{
                            return(
                                <TableRow key={application?._id}>
                                    <TableCell className="font-medium" >{application?.createdAt.split("T")[0]}</TableCell>
                                    <TableCell>{application?.job?.title}</TableCell>
                                    <TableCell>{application?.job?.company?.name}</TableCell>
                                    <TableCell className="text-right">{application?.status}</TableCell>
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