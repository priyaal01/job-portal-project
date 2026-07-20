import { createSlice } from "@reduxjs/toolkit";

const normalizeUser = (user) => {
    if (!user) return user;

    const profile = user.profile || {};
    const normalizedProfile = {
        ...profile,
        location: profile.location ?? user.location ?? "",
        domain: profile.domain ?? user.domain ?? "",
        about: profile.about ?? user.about ?? "",
        skills: profile.skills ?? user.skills ?? [],
    };

    return {
        ...user,
        profile: normalizedProfile,
        location: normalizedProfile.location,
        domain: normalizedProfile.domain,
        about: normalizedProfile.about,
        skills: normalizedProfile.skills,
    };
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setUser: (state, action) => {
            state.user = normalizeUser(action.payload)
        }
    }
})

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;