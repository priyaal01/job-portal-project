import React from 'react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const filterData = [
    {
        filterType: "Location",
        array: ["delhi", "Banglore", "Mumbai", "Pune", "Hyderabad", "gurgaon"]
    },

    {
        filterType: "Industry",
        array: ["Frontend Developer", "Fullstack Developer", "Backend Developer", "Devops Engineer", "Data Scientist"]
    },

    {
        filterType: "Salary",
        array: ["0-40k", "40k-90k", "1lakh-2lakh","2lakh-4lakh","5lakh-10lakh"]
    },

    {
        filterType:"Job Type",
        array:["Full-time","Part-time","Remote","Hybrid"]
    }
]

const FilterCard = () => {
    return (
        <div className='w-full bg-white p-2 '>
            <h1 className='text-lg font-bold'>Filter Jobs</h1>
            <hr className=' mb-1' />
            <RadioGroup defaultValue="comfortable" className="w-fit">
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className='text-lg font-bold'>{data.filterType}</h1>
                            {
                                data.array.map((item, index) => {
                                    return (
                                        <div className='flex items-center gap-2 mb-1'>
                                            <RadioGroupItem value={item} />
                                            <Label>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>

        </div>
    )
}

export default FilterCard