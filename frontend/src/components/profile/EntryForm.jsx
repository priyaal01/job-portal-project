import React from "react";
import { Check, X } from "lucide-react";
import { Field } from "./ProfileUi";

const GRID_COLS = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" };

const EntryForm = ({ form, setForm, onSave, onCancel, rows, descriptionField }) => {
    const set = (name, value) => setForm({ ...form, [name]: value });
    return (
        <div className="border border-slate-200 rounded-lg p-4 space-y-3 bg-slate-50">
            {rows.map((row, i) => (
                <div
                    key={i}
                    className={row.length > 1 ? `grid ${GRID_COLS[row.length]} gap-3 items-end` : ""}
                >
                    {row.map((f) =>
                        f.type === "checkbox" ? (
                            <label key={f.name} className="flex items-center gap-2 text-sm text-slate-600 pb-2">
                                <input type="checkbox" checked={form[f.name]} onChange={(e) => set(f.name, e.target.checked)} />
                                {f.label}
                            </label>
                        ) : (
                            <Field key={f.name} label={f.label}>
                                <input
                                    className="input"
                                    value={form[f.name]}
                                    disabled={f.disableWhen && form[f.disableWhen]}
                                    placeholder={f.disableWhen && form[f.disableWhen] ? f.placeholderWhen : ""}
                                    onChange={(e) => set(f.name, e.target.value)}
                                />
                            </Field>
                        )
                    )}
                </div>
            ))}

            {descriptionField && (
                <Field label={descriptionField.label}>
                    <textarea
                        className="input min-h-[70px] resize-none"
                        value={form[descriptionField.name]}
                        onChange={(e) => set(descriptionField.name, e.target.value)}
                    />
                </Field>
            )}

            <div className="flex gap-2">
                <button onClick={onSave} className="btn-primary"><Check size={14} /> Save</button>
                <button onClick={onCancel} className="btn-secondary"><X size={14} /> Cancel</button>
            </div>
        </div>
    )
}

export default EntryForm