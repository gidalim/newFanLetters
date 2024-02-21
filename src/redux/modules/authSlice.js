import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../axios/api";

const initialState = {
  isLoggedin: !!localStorage.getItem("accessToken"),
  avatar: localStorage.getItem("avatar"),
  nickname: localStorage.getItem("nickname"),
  userId: localStorage.getItem("userId"),
  isLoading: false,
  isError: false,
  error: null,
};

export const __editProfile = createAsyncThunk(
  "editProrile",
  async (formData, thunkAPI) => {
    try {
      const { data } = await authApi.patch("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __login = createAsyncThunk(
  "login",
  async ({ id, password }, thunkAPI) => {
    try {
      const { data } = await authApi.post("/login", {
        id,
        password,
      });
      const { accessToken, avatar, nickname, userId } = data;
      if (data.success) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("userId", userId);

        alert("로그인 성공");
        return { accessToken, avatar, nickname, userId };
      }
    } catch (error) {
      console.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { accessToken, avatar, nickname, userId } = action.payload;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("userId", userId);
      state.isLoggedin = true;
      state.avatar = avatar;
      state.nickname = nickname;
      state.userId = userId;
    },

    logout: (state) => {
      state.isLoggedin = false;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(__login.fulfilled, (state, action) => {
      const { accessToken, avatar, nickname, userId } = action.payload;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("userId", userId);
      state.isLoggedin = true;
      state.avatar = avatar;
      state.nickname = nickname;
      state.userId = userId;
      state.isLoading = false;
    });
    builder.addCase(__login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
    builder.addCase(__editProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(__editProfile.fulfilled, (state, action) => {
      const { avatar, nickname } = action.payload;
      if (avatar) {
        localStorage.setItem("avatar", avatar);
        state.avatar = avatar;
      }
      if (nickname) {
        localStorage.setItem("nickname", nickname);
        state.nickname = nickname;
      }
      state.isLoading = false;
      alert("프로필 변경이 완료되었어요.");
    });
    builder.addCase(__editProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
