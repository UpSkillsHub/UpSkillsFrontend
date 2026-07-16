import api from "./client.js";

// Generic REST helpers for the standard resources exposed by the backend.
function crud(base) {
  return {
    list: (params) => api.get(base, { params }).then((r) => r.data),
    get: (id) => api.get(`${base}/${id}`).then((r) => r.data),
    create: (payload) => api.post(base, payload).then((r) => r.data),
    update: (id, payload) => api.put(`${base}/${id}`, payload).then((r) => r.data),
    remove: (id) => api.delete(`${base}/${id}`).then((r) => r.data),
  };
}

export const usersApi = crud("/users");

export const coursesApi = {
  ...crud("/courses"),
  byTrainer: (trainerId) =>
    api.get(`/courses/trainer/${trainerId}`).then((r) => r.data),
};

export const modulesApi = crud("/modules");
export const lessonsApi = crud("/lessons");
export const enrollmentsApi = crud("/enrollments");
export const paymentsApi = crud("/payments");
export const reportsApi = crud("/reports");
export const teamsApi = crud("/teams");
