import { useEffect, useState } from "react";
import { usersApi } from "../api/resources.js";
import Reveal from "../components/Reveal.jsx";
import Modal from "../components/Modal.jsx";

function extractList(res) {
  const d = res?.data ?? res;
  const list = d?.users ?? d?.results ?? d;
  return Array.isArray(list) ? list : [];
}

export default function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    usersApi
      .list({ role: "trainer" })
      .then((res) => setTrainers(extractList(res).filter((u) => !u.role || u.role === "trainer")))
      .catch(() => setTrainers([]));
  }, []);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-50 to-white" />
      <div className="container-page relative py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="badge">Trainers</span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Meet Our Trainers</h1>
          <p className="mt-4 text-lg text-slate-600">
            Learn from practitioners currently working in the field.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.length > 0 ? (
            trainers.map((t, i) => (
              <Reveal key={t.id ?? t._id} delay={(i % 3) * 90}>
                <button
                  onClick={() => setSelected(t)}
                  className="card card-hover group w-full p-8 text-center"
                >
                  <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-brand-300 to-brand-600 text-2xl font-bold text-white shadow-glow transition-transform duration-500 ease-apple group-hover:scale-105">
                    {(t.name || "?").charAt(0).toUpperCase()}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{t.name || "Trainer"}</h3>
                  <p className="mt-1 text-sm text-brand-600">{t.title || t.expertise || "Practitioner & Mentor"}</p>
                  <span className="mt-4 inline-block text-sm font-medium text-slate-400 transition-colors group-hover:text-brand-600">
                    View profile →
                  </span>
                </button>
              </Reveal>
            ))
          ) : (
            <p className="text-slate-500">Trainer profiles will appear here once the backend is connected.</p>
          )}
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name || "Trainer"}>
        {selected && (
          <div>
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-brand-300 to-brand-600 text-xl font-bold text-white">
                {(selected.name || "?").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-brand-dark">{selected.name}</p>
                <p className="text-sm text-brand-600">{selected.title || selected.expertise || "Practitioner & Mentor"}</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              {selected.bio ||
                "An experienced practitioner teaching what actually matters in the field today, with a focus on real projects and job-ready outcomes."}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
