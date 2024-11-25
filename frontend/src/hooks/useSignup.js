// library imports
import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'

// local imports
import { setUser } from '../features/UserSlice'
import axiosInstance from '../api/axios'

export const useSignup = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const signup = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      const { data } = await axiosInstance.post('/api/user/signup', { email, password })
      dispatch(setUser(data))
      localStorage.setItem('user', JSON.stringify(data))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.response.data.error)
    }
  }

  return { signup, loading, error }
}