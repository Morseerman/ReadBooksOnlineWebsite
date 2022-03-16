import http from "../http-common";
const getAll = () => {
  return http.get("/users");
};
const get = (id) => {
  return http.get(`/users/${id}`);
};
const getByUserId = (userId) => {
  return http.get(`/users/${userId}`);
};
const create = (data) => {
  return http.post("/users", data);
};
const update = (id, data) => {
  return http.put(`/users/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/users/${id}`);
};
const removeAll = () => {
  return http.delete(`/users`);
};
const findByNo = (no) => {
  return http.get(`/users?no=${no}`);
};
export default {
  getAll,
  get,
  getByUserId,
  create,
  update,
  remove,
  removeAll,
  findByNo,
};
