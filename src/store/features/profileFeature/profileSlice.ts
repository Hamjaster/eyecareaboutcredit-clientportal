import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompanyProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  description: string;
  website: string;
  address: string;
  phoneNumber: string;
}

interface ProfileState {
  profile: CompanyProfile | null;
}

const initialState: ProfileState = {
  profile: {
    id: "",
    name: "",
    email: "",
    avatar: null,
    description: "",
    website: "",
    address: "",
    phoneNumber: "",
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Action to set or update the entire profile
    setProfile: (state, action: PayloadAction<CompanyProfile>) => {
      state.profile = action.payload;
    },
    // Action to update profile details (excluding avatar)
    updateProfile: (state, action: PayloadAction<Partial<CompanyProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    // Action to update the avatar
    updateAvatar: (state, action: PayloadAction<string>) => {
      if (state.profile) {
        state.profile.avatar = action.payload;
      }
    },
    // Action to delete the avatar
    deleteAvatar: (state) => {
      if (state.profile) {
        state.profile.avatar = null;
      }
    },
    // Action to clear the profile
    clearProfile: (state) => {
      state.profile = null;
    },
  },
});

export const {
  setProfile,
  updateProfile,
  updateAvatar,
  deleteAvatar,
  clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
