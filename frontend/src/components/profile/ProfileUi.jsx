import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export function Section({ title, icon, onEdit, editLabel = "Edit", editIcon, children }) {
    return (
        <div className="px-6 sm:px-8 mt-6">
            <div className="border border-slate-200 rounded-xl bg-white p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900">
                        {icon}
                        {title}
                    </h2>
                    {onEdit && (
                        <button
                            onClick={onEdit}
                            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-orange-600 transition"
                        >
                            {editIcon || <Pencil size={13} />}
                            {editLabel}
                        </button>
                    )}
                </div>
                {children}
            </div>
        </div>
    );
}

export function Field({ label, children }) {
    return (
        <label className="block">
            <span className="block text-xs font-medium text-slate-500 mb-1">{label}</span>
            {children}
        </label>
    );
}

export function ListItem({ title, subtitle, meta, description, onEdit, onDelete }) {
    return (
        <div className="group flex items-start justify-between gap-3 border-b last:border-b-0 border-slate-100 pb-4 last:pb-0">
            <div>
                <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
                <p className="text-sm text-slate-600">{subtitle}</p>
                <p className="text-xs text-slate-400 mt-0.5">{meta}</p>
                {description && <p className="text-sm text-slate-500 mt-2 leading-relaxed">{description}</p>}
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition shrink-0">
                <button onClick={onEdit} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500">
                    <Pencil size={14} />
                </button>
                <button onClick={onDelete} className="p-1.5 rounded-md hover:bg-red-50 text-red-500">
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
}

export function EmptyState({ text }) {
    return <p className="text-sm text-slate-400 italic">{text}</p>;
}