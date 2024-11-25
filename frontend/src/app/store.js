// library imports
import { configureStore } from '@reduxjs/toolkit'

// local imports
import WorkoutsReducer from '../features/WokroutsSlice'
import UserReducer from '../features/UserSlice'

export default configureStore({
    reducer: {
        UserSlice: UserReducer,
        WorkoutsSlice: WorkoutsReducer
    }
})