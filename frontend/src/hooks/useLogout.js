// library imports
import React from 'react'
import { useDispatch } from 'react-redux'

// local imports
import { resetUser } from '../features/UserSlice'
import { resetWorkouts } from '../features/WokroutsSlice'

export const useLogout = () => {
    const dispatch = useDispatch()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch(resetUser())
        dispatch(resetWorkouts())
    }

    return { logout }
}