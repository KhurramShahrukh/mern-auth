import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    workouts: [],
}

export const WorkoutsSlice = createSlice({
    name: 'WorkoutsSlice',
    initialState,
    reducers: {
        resetWorkouts: () => initialState,
        setWorkouts: (state, action) => {
            state.workouts = action.payload
        },
        addNewWorkout: (state, action) => {
            state.workouts = [action.payload, ...state.workouts]
        },
        deleteWorkout: (state, action) => {
            state.workouts = state.workouts.filter((workout) => workout._id !== action.payload._id)
        }
    },
})

export const { resetWorkouts, setWorkouts, addNewWorkout, deleteWorkout } = WorkoutsSlice.actions

export default WorkoutsSlice.reducer