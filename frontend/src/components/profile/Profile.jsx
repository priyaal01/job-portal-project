import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Briefcase, GraduationCap } from "lucide-react";
import ApplicationJobTable from "../ApplicationJobTable";
import ProfileHeader from "./ProfileHeader";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import EntrySection from "./EntrySection";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setApplications } from "@/redux/applicationSlice";

const Profile = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch=useDispatch();
    useEffect(() => {
        const fetchAllApplications = async () => {
            try {
                const res=await axios.get(`${APPLICATION_API_END_POINT}/applications`,{withCredentials:true});
                console.log(res.data)
                if(res.data.success){
                    toast.success(res.data.message)
                    dispatch(setApplications(res.data.applications))
                }

            }
            catch (err) {
                console.log(err)
            }
        }
        fetchAllApplications();
    }, [])

    const [coverFile, setCoverFile] = useState(null);
    const [profileFile, setProfileFile] = useState(null);




    const profile = {
        name: user?.fullname || "",
        domain: user?.profile?.domain ?? user?.domain ?? "",
        location: user?.profile?.location ?? user?.location ?? "",
        email: user?.email || "",
        phone: user?.phonenumber || "",
        about: user?.profile?.about || "",
        skills: user?.profile?.skills || [],
        profilePhoto: user?.profile?.profilePhoto || "",
        coverPhoto: user?.profile?.coverPhoto || ""
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="w-full px-4 sm:px-6 md:px-8 max-w-4xl mx-auto py-4 pb-16">
                <ProfileHeader profile={profile} profileFile={profileFile}
                    setProfileFile={setProfileFile}
                    coverFile={coverFile}
                    setCoverFile={setCoverFile} />
                <AboutSection profile={profile} />
                <SkillsSection profile={profile} />
                {/* <EntrySection {...experienceConfig} items={experience} setItems={setExperience} />
                <EntrySection {...educationConfig} items={education} setItems={setEducation} /> */}
                <div className="flex items-center justify-center mt-4">
                    <ApplicationJobTable />
                </div>
            </div>
        </div>
    )
}

export default Profile