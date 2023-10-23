import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const userLogin = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post("/auth/login", { email, password });
            //store token
            if (data?.success) {
                alert(data?.message);
                localStorage.setItem("token", data?.token);
                localStorage.setItem('user', JSON.stringify(data?.user));
                window.location.replace("/");
            }
            return data;
        } catch (error) {
            alert(error.response.data?.message);
            if (error.response && error.response.data?.message) {
                return rejectWithValue(error.response.data?.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

//register
export const userRegister = createAsyncThunk(
    "auth/signup",
    async ({ name, email, password, city }, { rejectWithValue }) => {
        try {
            const { data } = await API.post("/auth/signup", { name, email, password, city });
            if (data?.success) {
                alert(data?.message);
                localStorage.setItem("token", data?.token);
                localStorage.setItem('user', JSON.stringify(data?.user));
                window.location.replace("/");
            }
            return data;
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data?.message) {
                alert(error.response.data?.message);
                return rejectWithValue(error.response.data?.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const userUpdate = createAsyncThunk(
    "user/update",
    async ({ name, email, password, city }, { rejectWithValue }) => {
        try {
            const { data } = await API.put("/user/update", { name, email, password, city });
            if (data?.success) {
                alert(data?.message);
                localStorage.setItem("token", data?.token);
                localStorage.setItem('user', JSON.stringify(data?.user));
                window.location.replace("/");
            }
            return data;
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data?.message) {
                alert(error.response.data?.message);
                return rejectWithValue(error.response.data?.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

//current user
export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async ({ rejectWithValue }) => {
    try {
        const res = await API.get("/auth/getCurrentUser");
        if (res.data) {
            return res?.data;
        }
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data?.message) {
            return rejectWithValue(error.response.data?.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
}
);