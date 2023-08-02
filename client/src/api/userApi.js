import axiosClient from './axiosClient';

const userApi = {
  getAll: async () => {
    const res = await axiosClient.get('/users');
    return res.data;
  },

  getUserById: async id => {
    const res = await axiosClient.get(`/users/${id}`);
    return res.data;
  },

  createUser: async user => {
    const res = await axiosClient.post('/users', user);
    return res.data;
  },

  updateUser: async updatedUser => {
    return await axiosClient.patch(`/users/${updatedUser.idUser}`, updatedUser);
  },

  deleteUser: async id => {
    const res = await axiosClient.delete(`/users/${id}`);
    return res.data;
  },
};

export default userApi;
