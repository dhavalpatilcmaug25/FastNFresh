import api from "../api";

export const fetchUserOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (!userString) {
      throw new Error("User not found in localStorage");
    }
    const user = JSON.parse(userString);
    const response = await api.get(`/orders/user/${user.user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderDetails = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
