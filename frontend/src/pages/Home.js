// library imports
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

// local imports
import WorkoutDetails from '../components/WorkoutDetails'
import WokroutForm from '../components/WorkoutForm'
import { setWorkouts } from '../features/WokroutsSlice'
import axiosInstance from '../api/axios'

const Home = () => {
    const dispatch = useDispatch()
    const { workouts } = useSelector((state) => state.WorkoutsSlice)

    const fetchWorkouts = async () => {
        try {
            const { data } = await axiosInstance.get('/api/workouts')
            dispatch(setWorkouts(data))
        } catch (error) {
            console.log('error in fetchWorkouts', error)
        }
    }

    useEffect(() => {
        fetchWorkouts()
    }, [])


    return (
        <div className='home'>
            <div className='workouts'>
                {workouts.map((workout) => {
                    return <WorkoutDetails key={workout._id} workout={workout} />
                })}
            </div>
            <WokroutForm />
        </div>
    )
}

export default Home