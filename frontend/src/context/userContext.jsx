import { createContext, useState, useEffect } from "react";
import axiosinstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openAuthForm, setOpenAuthForm] = useState(false);

  useEffect(() => {
    if (user) return;

    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosinstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    if (userData.token) {
      localStorage.setItem("token", userData.token);
    }
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{ user, setUser,loading, openAuthForm, setOpenAuthForm, updateUser, clearUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
