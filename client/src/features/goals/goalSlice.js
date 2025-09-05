import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalService from "./goalService"

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createGoal = createAsyncThunk(
    "goals/create",
    async (goalData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalService.createGoal(goalData, token);
        } catch (error) {
            const message =
                (error.response?.data?.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getGoal = createAsyncThunk(
    "goals/get",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalService.getGoal(token);
        } catch (error) {
            const message =
                (error.response?.data?.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateGoals = createAsyncThunk(
    "goals/update",
    async ({ id, text }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalService.updateGoal(id, text, token)
        } catch (error) {
            const message = (error.response?.data?.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteGoals = createAsyncThunk(
    "goals/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalService.deleteGoal(id, token);
        } catch (error) {
            const message =
                (error.response?.data?.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload.data
            })
            .addCase(getGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.data
            })
            .addCase(deleteGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter(
                    (goal) => goal._id !== action.payload.data._id
                )
            })
            .addCase(deleteGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.data
            })
            .addCase(updateGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.map(goal =>
                    goal._id === action.payload.data._id ? action.payload.data : goal
                )
            })
            .addCase(updateGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateGoals.pending, (state) => {
                state.isLoading = true
            })

    }
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer
