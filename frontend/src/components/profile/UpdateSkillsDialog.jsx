import { setUser } from '@/redux/authSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from '../ui/field';
import { Label } from '../ui/label';
import { Button } from '../ui/button'
import { USER_API_END_POINT } from '@/utils/constant';

const UpdateSkillsDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth)
    const getProfileValue = (field) => user?.profile?.[field] ?? user?.[field] ?? ""

    const [input, setInput] = useState({
        skillsText: Array.isArray(getProfileValue("skills")) ? getProfileValue("skills").join(", ") : ""
    })

    useEffect(() => {
        const skills = Array.isArray(getProfileValue("skills")) ? getProfileValue("skills") : [];
        setInput({
            skillsText: skills.join(", ")
        })
    }, [user])

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }))
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            // Split by newlines first, then by commas, to handle both separators robustly
            const skills = input.skillsText
                .split('\n')
                .flatMap(skill => skill.split(','))
                .map(skill => skill.trim())
                .filter(Boolean)

            const payload = {
                skills
            }
            const res = await axios.put(`${USER_API_END_POINT}/profile/update`, payload, { withCredentials: true })

            if (res.data.success) {
                const updatedUser = res.data.user || {
                    ...user,
                    profile: {
                        ...(user?.profile || {}),
                        skills
                    },
                    skills
                };
                dispatch(setUser(updatedUser));
                toast.success(res.data.message || "Skills updated successfully");
                setOpen(false);
            }
            console.log(skills)

        }
        catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-sm">
                    <form onSubmit={submitHandler}>
                        <DialogHeader>
                            <DialogTitle>Update Skills</DialogTitle>
                        </DialogHeader>
                        <FieldGroup className="mt-4">
                            <Field>
                                <Label htmlFor="skills">Skills (comma or newline separated)</Label>
                                <textarea id="skills" name="skillsText" value={input.skillsText} onChange={changeEventHandler} rows={6} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
                            </Field>
                        </FieldGroup>
                        <DialogFooter className="mt-4">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateSkillsDialog