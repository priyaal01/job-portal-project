import React, { useState } from "react";
import { UserIcon, MapPin, Mail, Phone, Pencil, } from "lucide-react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

export default function ProfileHeader({ profile, profileFile, setProfileFile, coverFile, setCoverFile }) {
    const { user } = useSelector(store => store.auth)
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="relative">
                <div className="h-40 sm:h-52 md:h-64 w-full bg-cover bg-center flex items-center justify-center relative border border-slate-400 rounded-lg overflow-hidden">
                    {user?.profile?.coverPhoto ? (
                        <img src={user?.profile?.coverPhoto} className="w-full h-full object-fill"  />
                    ) : (
                        <span className="text-base sm:text-lg md:text-xl bg-slate-100 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-full">
                            Add Cover Image
                        </span>
                    )}
                </div>

                <div className="absolute left-4 sm:left-6 md:left-8 -bottom-12 sm:-bottom-14 md:-bottom-16 lg:-bottom-14">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full ring-4 ring-slate-50 bg-slate-200 overflow-hidden flex items-center justify-center">
                        {user?.profile?.profilePhoto ? (
                            <img src={user?.profile?.profilePhoto} className="w-full h-full object-cover" />
                        ) : (
                            <UserIcon size={40} className="sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 w-10 h-10 text-slate-400" />
                        )}
                    </div>
                </div>
            </div>

            <div className="pt-20 sm:pt-20 px-6 sm:px-8">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{profile.name}</h1>
                        <p className="text-slate-600 font-medium mt-0.5">{profile.domain}</p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5"><MapPin size={14} /> {profile.location}</span>
                            <span className="flex items-center gap-1.5"><Mail size={14} /> {profile.email}</span>
                            <span className="flex items-center gap-1.5"><Phone size={14} /> {profile.phone}</span>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-1.5 text-sm font-medium text-slate-700 border border-slate-300 hover:border-slate-400 rounded-lg px-3 py-2 shrink-0 transition"
                    >
                        <Pencil size={14} /> Edit profile
                    </button>
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} profileFile={profileFile}
                setProfileFile={setProfileFile}
                coverFile={coverFile}
                setCoverFile={setCoverFile} />
        </>
    );
}