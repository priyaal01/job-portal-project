import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '@/utils/constant';
import { Field, FieldGroup } from '../ui/field';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button'
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice'

const UpdateAboutDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth)
    const getProfileValue = (field) => user?.profile?.[field] ?? user?.[field] ?? ""

    const [input, setInput] = useState({
        about: getProfileValue("about")
    });

    useEffect(() => {
        setInput({
            about: getProfileValue("about")
        })
    }, [user])

    const changeEventHandler = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const payload = {
                about: input.about ?? ""
            }
            const res = await axios.put(`${USER_API_END_POINT}/profile/update`, payload, { withCredentials: true }
            );

            if (res.data.success) {
                const updatedUser = res.data.user || {
                    ...user,
                    profile: {
                        ...(user?.profile || {}),
                        about: input.about ?? ""
                    },
                    about: input.about ?? ""
                };

                dispatch(setUser(updatedUser));
                toast.success(res.data.message || "Profile updated successfully");
                setOpen(false);
            }

        } catch (err) {
            toast.error(err.response?.data?.message);
        }

    }

    return (
        <div><Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={submitHandler}>
                    <DialogHeader>
                        <DialogTitle>Update About</DialogTitle>
                    </DialogHeader>
                    <FieldGroup className="mt-4">
                        <Field>
                            <Label htmlFor="about">About</Label>
                            <Input id="about" name="about" value={input.about} onChange={changeEventHandler} rows={6} />
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
        </Dialog></div>
    )
}

export default UpdateAboutDialog