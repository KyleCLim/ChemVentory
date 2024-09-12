import axios from "axios";

//////---ROOT API---//////
const api = axios.create({
    baseURL: "http://localhost:8800/api",
    withCredentials: true,
});

/////////////////////////////////////
//////---Admin API Services---//////
export const deleteUser = (id) => api.delete(`/admin/delete-user/${id}`);

export const getTransactionLog = () => api.get(`admin/admin-trasactionlog`);

export const changePassword = (id, oldPassword, newPassword) =>
    api.put(`/admin/change-password/${id}`, { oldPassword, newPassword });

export const getUserList = () => api.get(`/admin/admin-userlist`);

export const updateUser = (id, userData) =>
    api.put(`/admin/update-user/${id}`, userData);

///////////////////////////////
//////---Auth Service---//////
export const registerUser = (userData) => {
    return api.post("/auth/register", userData);
};

/////////////////////////////////////////
//////---Inventory API Services---//////
export const updateFavoriteStatus = (id, updatedStatus) =>
    api.put(`/inventory/add-watchlist/${id}`, {
        isfavorite: updatedStatus,
    });

export const getInventorySummary = () => api.get(`/inventory/inv-summary`);

export const getWatchlist = () => api.get(`/inventory/inv-watchlist`);

export const updateChemical = (id, chemicalData) => {
    return api.put(`/inventory/update-chem/${id}`, chemicalData);
};

export const getInventoryPerContainer = () =>
    api.get(`/inventory/inv-per-container`);

////////////////////////////////////////
//////---Transact API Services---//////
export const updateChemUsage = (id, usageQty, initialQty, unit) =>
    api.put(`/transacts/use-chem/${id}`, { usageQty, initialQty, unit });

export const addChemicalQty = (id, addedQty, initialQty, unit) =>
    api.put(`/transacts/add-qty/${id}`, {
        usageQty: addedQty,
        initialQty,
        unit,
    });

export const deleteItem = (id) => api.delete(`/transacts/${id}`);

export const addChemicalToInventory = (chemicalData) =>
    api.post(`/transacts/add-chem`, chemicalData);

export const getTransactionHistory = (id) =>
    api.get(`/transacts/transaction-history/${id}`);
