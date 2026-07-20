import React, { useState } from "react";
import UpdateAboutDialog from "./UpdateAboutDialog";
import { Pencil } from "lucide-react";

const AboutSection = ({ profile}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="px-6 sm:px-8 mt-6">
                <div className="border border-slate-200 rounded-xl bg-white p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="flex items-center gap-2 text-base font-semibold text-slate-800">
                            About
                        </h2>
                        <button
                            onClick={() => setOpen(true)}
                            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-green-600 transition"
                        >
                            <Pencil size={13} />
                            Edit
                        </button>
                    </div>
                    <p className="text-slate-600">{profile.about}</p>
                </div>
            </div>
            <UpdateAboutDialog open={open} setOpen={setOpen} />
        </>
    )
}

export default AboutSection