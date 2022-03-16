import http from "../http-common";
const getAll = () => {
  return http.get("/bills");
};
const get = (id) => {
  return http.get(`/bills/${id}`);
};
const getByUserId = (userId) => {
  return http.get(`/bills/test/${userId}`);
};
const create = (data) => {
  return http.post("/bills", data);
};
const update = (id, data) => {
  return http.put(`/bills/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/bills/${id}`);
};
const removeAll = () => {
  return http.delete(`/bills`);
};
const findByNo = (no) => {
  return http.get(`/bills?no=${no}`);
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
