import React from 'react'
import {
  MapPin, IndianRupee, Briefcase, Clock, Building2, GraduationCap,
  CheckCircle2, Users, ArrowLeft, Share2, Bookmark, Globe,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const job = {
  title: "MERN Stack Developer — Fresher",
  company: "Nimbus Softworks",
  companySize: "11–50 employees",
  companyWebsite: "nimbussoftworks.io",
  location: "Pune, Maharashtra",
  workMode: "Hybrid",
  type: "Full-time",
  experience: "0–1 yr",
  salary: "₹4.2L – ₹6L /yr",
  posted: "3 days ago",
  applicants: 34,
  openings: 2,
  logoLetter: "N",
  logoColor: "#0E6357",
  about:
    "Nimbus Softworks builds internal tooling and customer dashboards for logistics companies across Maharashtra. The engineering team is 14 people, ships weekly, and pairs juniors with a senior mentor for the first 6 months.",
  description:
    "You'll work across the stack on our core product — a React + Node dashboard used by warehouse operations teams. Expect to own small features end-to-end within your first month: from a REST endpoint in Express to the React view that consumes it. You'll ship to production every week and get direct code review from senior engineers.",
  responsibilities: [
    "Build and maintain UI components in React with Tailwind CSS",
    "Design and consume REST APIs built with Node.js and Express",
    "Write and optimize MongoDB queries for reporting features",
    "Fix bugs reported through the internal QA and support pipeline",
    "Participate in daily standups and weekly sprint planning",
  ],
  requirements: [
    "Working knowledge of JavaScript (ES6+), React, and Node.js",
    "Understands REST API design and basic MongoDB schema modeling",
    "Comfortable with Git and collaborative branching workflows",
    "A portfolio or GitHub with at least one deployed full-stack project",
    "B.E./B.Tech in CS, IT, or a related field (2026 graduates welcome)",
  ],
  niceToHave: ["Exposure to Docker", "Familiarity with shadcn/ui or a component library"],
  benefits: [
    "Health insurance for you and dependents",
    "Learning budget of ₹15,000/year for courses & certifications",
    "Flexible hybrid schedule — 2 days remote",
    "Senior mentor assigned for your first 6 months",
  ],
  skills: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Git"],
};

const Meta = ({ icon: Icon, children }) => (
  <span className={`inline-flex items-center gap-1.5 text-[13px]`}>
    <Icon size={13} /> {children}
  </span>
);

const ListSection = ({ title, items, bullet = "dot", cols = 1 }) => (
  <section>
    <h3 className="mb-3 text-[13px] font-bold uppercase tracking-wide text-[#0E6357]">{title}</h3>
    <ul className={cols === 2 ? "grid grid-cols-1 gap-2.5 sm:grid-cols-2" : "space-y-2.5"}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-[14.5px] leading-relaxed text-[#4A4636]">
          {bullet === "check"
            ? <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#0E6357]" />
            : <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0E6357]/50" />}
          {item}
        </li>
      ))}
    </ul>
  </section>
);

const ChipSection = ({ title, items }) => (
  <section>
    <h3 className="mb-3 text-[13px] font-bold uppercase tracking-wide text-[#0E6357]">{title}</h3>
    <div className="flex flex-wrap gap-1.5">{items.map((s) => <Badge key={s} variant="outline" className='border border-[#E4E0D4] text-[#4A4636]'>{s}</Badge>)}</div>
  </section>
);

const facts = [
  [IndianRupee, "Salary", job.salary],
  [Briefcase, "Job type", job.type],
  [Clock, "Experience", job.experience],
  [MapPin, "Location", `${job.location} · ${job.workMode}`],
  [GraduationCap, "Level", "Entry-level / Fresher"],
  [Users, "Openings", job.openings],
];

const FactRow = ([Icon, label, value]) => (
  <div key={label} className="flex items-start gap-3">
    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0E6357]/8">
      <Icon size={15} strokeWidth={2} className="text-[#0E6357]" />
    </div>
    <div className="min-w-0">
      <div className="text-[11px] font-medium uppercase tracking-wide text-[#8A8578]">{label}</div>
      <div className="truncate text-[13.5px] font-semibold text-[#1B1E23]">{value}</div>
    </div>
  </div>
);

const companyMeta = [[Users, job.companySize], [Globe, job.companyWebsite]];

const JobsDetails = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen bg-[#FCFBF8]'>
      <div className="border-b border-[#F0EEE5] shadow-sm bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 sm:px-8">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1B1E23]">
            <ArrowLeft size={15} /> Back to jobs
          </button>
          <div className='flex items-center gap-2'>
            <Bookmark className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#E7E3D8] text-[#1B1E23]" />
            <Share2 className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#E7E3D8]   text-[#1B1E23]" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-[#F0EEE5] bg-white">
        <div className="mx-auto max-w-5xl px-4 py-7 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-[20px] font-bold text-white"
                style={{ backgroundColor: job.logoColor }}
              >
                {job.logoLetter}
              </div>
              <div>
                <h1 className="text-[21px] font-bold leading-snug text-[#1B1E23] sm:text-[24px]">{job.title}</h1>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[#726C5C]">
                  <Meta icon={Building2}>{job.company}</Meta>
                  <span className="text-[#D8D3C4]">•</span>
                  <Meta icon={MapPin}>{job.location} · {job.workMode}</Meta>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {job.skills.slice(0, 5).map((s) => <Badge key={s} variant="outline" className='border border-[#E4E0D4] text-[#4A4636]'>{s}</Badge>)}
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:items-end">
              <Button variant='outline' className='bg-gradient-to-b from-green-500 to-green-400'>Apply now</Button>
              <span className="text-[11.5px] text-[#A39D8B]">{job.applicants} applicants · Posted {job.posted}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className='bg-white'>
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_260px]">
            <div className="space-y-8">
              <section>
                <h3 className="mb-3 text-[13px] font-bold uppercase tracking-wide text-[#0E6357]">About the Role</h3>
                <p className="text-[14.5px] leading-relaxed text-[#4A4636]">{job.description}</p>
              </section>

              <ListSection title="Responsibilities" items={job.responsibilities} />
              <ListSection title="Requirements" items={job.requirements} bullet="check" />
              {job.niceToHave?.length > 0 && <ChipSection title="Nice to have" items={job.niceToHave} />}
              <ListSection title="Benefits" items={job.benefits} bullet="check" cols={2} />
              <ChipSection title="Skills" items={job.skills} />
            </div>
            <aside className="h-fit space-y-5 rounded-2xl border border-[#F0EEE5] bg-white p-5 md:sticky md:top-6">
              {facts.map(FactRow)}
              <div className="border-t border-[#F0EEE5] pt-4">
                <Button variant='outline' className='bg-gradient-to-b from-green-500 to-green-400'>Apply now</Button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div >
  )
}

export default JobsDetails