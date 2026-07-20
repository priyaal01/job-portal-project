import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Section, ListItem, EmptyState } from "./ProfileUi";
import EntryForm from "./EntryForm";

const EntrySection = ({ title, icon, items, setItems, makeEmpty, rows, descriptionField, titleKey, subtitleKey, meta, isValid, }) => {
    const [form, setForm] = useState(null);

    function save() {
        if (!isValid(form)) return;
        setItems((list) =>
            form.id ? list.map((item) => (item.id === form.id ? form : item)) : [...list, { ...form, id: Date.now() }]
        );
        setForm(null);
    }
    function remove(id) {
        setItems((list) => list.filter((item) => item.id !== id));
    }
    return (
        <Section title={title} icon={icon} onEdit={!form ? () => setForm(makeEmpty()) : null} editLabel="Add" editIcon={<Plus size={14} />}>
            <div className="space-y-4">
                {items.map((item) =>
                    form?.id === item.id ? (
                        <EntryForm key={item.id} form={form} setForm={setForm} onSave={save} onCancel={() => setForm(null)} rows={rows} descriptionField={descriptionField} />
                    ) : (
                        <ListItem
                            key={item.id}
                            title={item[titleKey]}
                            subtitle={item[subtitleKey]}
                            meta={meta(item)}
                            description={item.description}
                            onEdit={() => setForm(item)}
                            onDelete={() => remove(item.id)}
                        />
                    )
                )}
                {form && form.id === null && (
                    <EntryForm form={form} setForm={setForm} onSave={save} onCancel={() => setForm(null)} rows={rows} descriptionField={descriptionField} />
                )}
                {items.length === 0 && !form && <EmptyState text={`No ${title.toLowerCase()} added yet.`} />}
            </div>
        </Section>
    )
}

export default EntrySection