import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
}

export const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        resetUser: () => initialState,
        setUser: (state, action) => {
            state.user = { ...state.user, ...action.payload }
        }
    },
})

export const { resetUser, setUser } = UserSlice.actions

export default UserSlice.reducer