import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {login, signup} from "@/app/api/authentication";
import {getUserProfile} from "@/app/api/getUserProfileApi";
import {deleteUser} from "@/app/api/deleteUserApi";
import {deleteMemeberApi} from "@/app/api/deleteMemberApi";
import {getUserAddressApi} from "@/app/api/getUserAddressApi";
import {getSingleUserApi} from "@/app/api/getSingleUserApi";
import {getUserEducation} from "@/app/api/getUserEducationApi";
import {getUserExperience} from "@/app/api/getUserExperienceApi";
import {getUserSkill} from "@/app/api/getUserSkillsApi";
import {getUserTeamApi} from "@/app/api/getUserTeamApi";
import {createTeam} from "@/app/api/createTeamApi";
import {addSkillsApi} from "@/app/api/addSkillsApi";
import {addWorkExperienceApi} from "@/app/api/addWorkExperienceApi";
import {getTeamLeaderApi} from "@/app/api/getTeamLeaderApi";
import {getAllTeamApi} from "@/app/api/getAllTeamApi";
import {addMemebersApi} from "@/app/api/addMembersApi";
import {getTeamListApi} from "@/app/api/getTeamListApi";
import {getTeamMembersApi} from "@/app/api/getTeamMembersApi";
import {teamUpdateApi} from "@/app/api/teamUpdateApi";
import {getTeamMemberApi} from "@/app/api/getTeamMemberApi";

const BASE_URL = 'http://127.0.0.1:8000';
const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
    user,
    token,
    singleUser: null,
    users: [],
    totalUsers: 0,
    totalTeams: 0,
    activeUsers: 0,
    activeUserPtg: 0,
    userProfile: [],
    teamLeader: [],
    allTeams: [],
    teamsList: [],
    teamMembers: [],
    singleTeamMember: [],
    userEducation: 0,
    userExperience: 0,
    userSkill: 0,
    userAddress: 0,
    userTeam: 0,
    userSingle: 0,
    loading: false,
    error: null,
};

export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/user/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`,
            },
            credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch user data');
        const {results, user} = data;
        thunkAPI.dispatch(setTotalUsers(data.total_users));
        thunkAPI.dispatch(setTotalTeams(data.total_teams));
        thunkAPI.dispatch(setActiveUsers(data.number_of_active_users));
        thunkAPI.dispatch(setActiveUsersPtg(data.active_user_percentage));
        return {users: results, singleUser: user};
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const setTotalUsers = (totalUsers) => ({
    type: 'auth/setTotalUsers',
    payload: totalUsers,
});
export const setTotalTeams = (totalTeams) => ({
    type: 'auth/setTotalTeams',
    payload: totalTeams,
});
export const setActiveUsers = (activeUsers) => ({
    type: 'auth/setActiveUsers',
    payload: activeUsers,
});
export const setActiveUsersPtg = (activeUserPtg) => ({
    type: 'auth/setActiveUsersPtg',
    payload: activeUserPtg,
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.users = [];
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        },
        setTotalUsers: (state, action) => {
            state.totalUsers = action.payload;
        },
        setTotalTeams: (state, action) => {
            state.totalTeams = action.payload;
        },
        setActiveUsers: (state, action) => {
            state.activeUsers = action.payload;
        },
        setActiveUsersPtg: (state, action) => {
            state.activeUserPtg = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = true;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', action.payload.token);
                    localStorage.setItem('user', JSON.stringify('true'));
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.singleUser = action.payload.singleUser;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserAddressApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserAddressApi.fulfilled, (state, action) => {
                state.loading = false;
                state.userAddress = action.payload;
            })
            .addCase(getUserAddressApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getSingleUserApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSingleUserApi.fulfilled, (state, action) => {
                state.loading = false;
                state.userSingle = action.payload;
            })
            .addCase(getSingleUserApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserEducation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserEducation.fulfilled, (state, action) => {
                state.loading = false;
                state.userEducation = action.payload;
            })
            .addCase(getUserEducation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserExperience.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserExperience.fulfilled, (state, action) => {
                state.loading = false;
                state.userExperience = action.payload;
            })
            .addCase(getUserExperience.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserSkill.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserSkill.fulfilled, (state, action) => {
                state.loading = false;
                state.userSkill = action.payload;
            })
            .addCase(getUserSkill.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserTeamApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserTeamApi.fulfilled, (state, action) => {
                state.loading = false;
                state.userTeam = action.payload;
            })
            .addCase(getUserTeamApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getTeamLeaderApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTeamLeaderApi.fulfilled, (state, action) => {
                state.loading = false;
                state.teamLeader = action.payload;
            })
            .addCase(getTeamLeaderApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllTeamApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTeamApi.fulfilled, (state, action) => {
                state.loading = false;
                state.allTeams = action.payload;
            })
            .addCase(getAllTeamApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getTeamListApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTeamListApi.fulfilled, (state, action) => {
                state.loading = false;
                state.teamsList = action.payload;
            })
            .addCase(getTeamListApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getTeamMembersApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTeamMembersApi.fulfilled, (state, action) => {
                state.loading = false;
                state.teamMemebers = action.payload;
            })
            .addCase(getTeamMembersApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getTeamMemberApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTeamMemberApi.fulfilled, (state, action) => {
                state.loading = false;
                state.singleTeamMember = action.payload;
            })
            .addCase(getTeamMemberApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteMemeberApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMemeberApi.fulfilled, (state, action) => {
                state.loading = false;
                state.teamMemebers = state.teamMemebers.filter(member => member.id !== action.payload);;
            })
            .addCase(deleteMemeberApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTeam.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(createTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addSkillsApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addSkillsApi.fulfilled, (state, action) => {
                state.loading = false;
                state.userSkill.push(action.payload);
            })
            .addCase(addSkillsApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addWorkExperienceApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addWorkExperienceApi.fulfilled, (state, action) => {
                state.loading = false;
                state.userExperience.push(action.payload);
            })
            .addCase(addWorkExperienceApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(teamUpdateApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(teamUpdateApi.fulfilled, (state, action) => {
                state.loading = false;
                state.allTeams = state.allTeams.map((team) =>
                    team.id === action.payload.id ? action.payload : team
                );
            })
            .addCase(teamUpdateApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addMemebersApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addMemebersApi.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(addMemebersApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
