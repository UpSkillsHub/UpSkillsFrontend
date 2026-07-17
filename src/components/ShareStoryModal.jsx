import { useState } from "react";
import { addTestimonial } from "../data/testimonials.js";
import { IconChat, IconClose, IconUser, IconCheck, IconArrow } from "./icons.jsx";

const MAX = 1000;

export default function ShareStoryModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", role: "", text: "" });
  const [photo, setPhoto] = useState(null);
  const [done, setDone] = useState(false);

  if (!open) return null;

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const close = () => {
    setForm({ name: "", role: "", text: "" });
    setPhoto(null);
    setDone(false);
    onClose();
  };

  const submit = (e) => {
    e.preventDefault();
    addTestimonial({ name: form.name, role: form.role, text: form.text, img: photo });
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-900/70 backdrop-blur-sm" onClick={close} />
      <div className="anim-pop relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-lift dark:bg-brand-900">
        {/* Header */}
        <div className="flex items-start justify-between bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15">
              <IconChat className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-lg font-extrabold">Share Your Story</h3>
              <p className="text-sm text-brand-100">Inspire future Up Skills Hub trainees</p>
            </div>
          </div>
          <button onClick={close} aria-label="Close" className="x-live grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/85 transition-all duration-300 hover:rotate-90 hover:scale-110 hover:bg-white/15 hover:text-white">
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-green-100 text-green-600">
              <IconCheck className="h-7 w-7" />
            </span>
            <h4 className="text-xl font-extrabold text-brand-dark">Thank you!</h4>
            <p className="mt-2 text-sm text-slate-500">
              Your story has been added to our Success Stories. Scroll up to see it in the carousel.
            </p>
            <button onClick={close} className="btn-primary mt-6 rounded-full px-8">Done</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 p-6">
            <div className="flex gap-4">
              {/* Photo */}
              <label className="flex shrink-0 cursor-pointer flex-col items-center">
                <span className="grid h-20 w-20 place-items-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 text-slate-400 transition hover:border-brand-400 hover:text-brand-500">
                  {photo ? <img src={photo} alt="" className="h-full w-full object-cover" /> : <IconUser className="h-7 w-7" />}
                </span>
                <span className="mt-1 text-xs text-slate-400">Add photo</span>
                <input type="file" accept="image/*" className="hidden" onChange={onPhoto} />
              </label>
              {/* Name + role */}
              <div className="flex flex-1 flex-col gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Full Name *</label>
                  <input name="name" value={form.name} onChange={handle} required placeholder="e.g. Jean-Luc Matabaro" className="input" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Role / Track *</label>
                  <input name="role" value={form.role} onChange={handle} required placeholder="e.g. Frontend Developer" className="input" />
                </div>
              </div>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-sm font-medium text-slate-600">Your Story *</label>
                <span className="text-xs text-slate-400">{form.text.length}/{MAX}</span>
              </div>
              <textarea
                name="text"
                value={form.text}
                onChange={handle}
                required
                maxLength={MAX}
                rows={5}
                placeholder="Share your experience at Up Skills Hub…"
                className="input"
              />
            </div>

            <p className="text-xs text-slate-400">Your story will be added to our Success Stories section.</p>

            <div className="flex justify-end gap-3">
              <button type="button" onClick={close} className="btn-secondary rounded-full">Cancel</button>
              <button className="btn-primary rounded-full">
                Submit Testimony <IconArrow className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
