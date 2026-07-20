import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const UpdateProfileDialog = ({ open, setOpen, coverFile, profileFile, setCoverFile, setProfileFile }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth)
    const { loading } = useSelector(store => store.auth)

    const getProfileValue = (field) => user?.profile?.[field] ?? user?.[field] ?? ""

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phonenumber: user?.phonenumber || "",
        location: getProfileValue("location"),
        domain: getProfileValue("domain")
    })

    useEffect(() => {
        setInput({
            fullname: user?.fullname || "",
            email: user?.email || "",
            phonenumber: user?.phonenumber || "",
            location: getProfileValue("location"),
            domain: getProfileValue("domain")
        })
    }, [user])

    const changeEventHandler = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const changeProfileFileHandler = (e) => {
        const file = e.target?.files?.[0]
        if (file) setProfileFile(file)
    }

    const changeCoverFileHandler = (e) => {
        const file = e.target?.files?.[0]
        if (file) setCoverFile(file)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            dispatch(setLoading(true));
            const formData = new FormData();
            formData.append("fullname", input.fullname);
            formData.append("email", input.email);
            formData.append("phonenumber", input.phonenumber);
            formData.append("location", input.location);
            formData.append("domain", input.domain);

            if (profileFile) {
                formData.append("profilePhoto", profileFile);
            }

            if (coverFile) {
                formData.append("coverPhoto", coverFile);
            }

            const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            })

            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
                setOpen(false)
            }
        }
        catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || "something went wrong")
        }
        finally {
            dispatch(setLoading(false))
        }

    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-sm" onInteractOutside={() => setOpen(false)}>
                    <form onSubmit={submitHandler}>
                        <DialogHeader>
                            <DialogTitle>Update profile</DialogTitle>
                        </DialogHeader>
                        <FieldGroup className="mt-4">
                            <Field>
                                <Label htmlFor="fullname">Name</Label>
                                <Input id="fullname" name="fullname" value={input.fullname} onChange={changeEventHandler} />
                            </Field>
                            <Field>
                                <Label htmlFor="domain">Role/Domain</Label>
                                <Input id="domain" name="domain" value={input.domain} onChange={changeEventHandler} />
                            </Field>
                            <Field>
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" name="location" value={input.location} onChange={changeEventHandler} />
                            </Field>
                            <Field>
                                <Label htmlFor="email">E-mail</Label>
                                <Input id="email" name="email" type="email" value={input.email} onChange={changeEventHandler} />
                            </Field>
                            <Field>
                                <Label htmlFor="phonenumber">Phone-no</Label>
                                <Input id="phonenumber" name="phonenumber" type="tel" value={input.phonenumber} onChange={changeEventHandler} />
                            </Field>
                            <Field>
                                <Label htmlFor="coverPhoto">Cover-Picture</Label>
                                <Input id="coverPhoto" name="coverPhoto" type="file" accept="image/*" onChange={changeCoverFileHandler} />
                            </Field>
                            <Field>
                                <Label htmlFor="profilePhoto">Profile-Picture</Label>
                                <Input id="profilePhoto" name="profilePhoto" type="file" accept="image/*" onChange={changeProfileFileHandler} />
                            </Field>

                        </FieldGroup>
                        <DialogFooter className="mt-4">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            {
                                loading ? <Button><Loader2 className='w-4 h-4 animate-spin' />Please Wait</Button> : <Button type="submit">Save changes</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog