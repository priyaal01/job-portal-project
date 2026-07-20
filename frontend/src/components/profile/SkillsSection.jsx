import { Pencil } from "lucide-react";
import React, { useState } from "react";
import UpdateSkillsDialog from "./UpdateSkillsDialog";

const SkillsSection = ({ profile }) => {
    const [open, setOpen] = useState(false)
    const skills = Array.isArray(profile?.skills) ? profile.skills : []

    return (
        <>
            <div className="px-6 sm:px-8 mt-6">
                <div className="border border-slate-200 rounded-xl bg-white p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="flex items-center gap-2 text-base font-semibold text-slate-800">
                            Skills
                        </h2>
                        <button
                            onClick={() => setOpen(true)}
                            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-green-600 transition"
                        >
                            <Pencil size={13} />
                            Update
                        </button>
                    </div>
                    {skills.length ? (
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="flex-shrink-0 inline-flex items-center whitespace-nowrap rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500">No skills added yet.</p>
                    )}
                </div>
            </div>
            <UpdateSkillsDialog open={open} setOpen={setOpen} />
        </>
    )
}

export default SkillsSection