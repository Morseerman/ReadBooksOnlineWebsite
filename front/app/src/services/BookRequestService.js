import http from "../http-common";
const getAll = () => {
  return http.get("/bookrequests");
};
const get = (id) => {
  return http.get(`/bookrequests/${id}`);
};
const getByUserId = (userId) => {
  return http.get(`/bookrequests/test/${userId}`);
};
const create = (data) => {
  return http.post("/bookRequests", data);
};
const update = (id, data) => {
  return http.put(`/bookrequests/${id}`, data);
};
const remove = (title) => {
  return http.delete(`/bookRequests/${title}`);
};
const removeAll = () => {
  return http.delete(`/bookrequests`);
};
const findByNo = (no) => {
  return http.get(`/bookrequests?no=${no}`);
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
