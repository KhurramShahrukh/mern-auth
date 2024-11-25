// library imports
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'

// local imports
import { deleteWorkout } from '../features/WokroutsSlice'
import { formatDistanceToNow } from 'date-fns'
import axiosInstance from '../api/axios'

const WorkoutDetails = ({ workout }) => {
    const dispatch = useDispatch()
    const { title, load, reps, createdAt, _id } = workout

    const deleteHandler = async () => {
        const { data } = await axiosInstance.delete(`/api/workouts/${_id}`)
        dispatch(deleteWorkout(data))
    }

    return (
        <div className='workout-details'>
            <h4>{title}</h4>
            <p><strong>Load (kg): </strong>{load}</p>
            <p><strong>Reps: </strong>{reps}</p>
            <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
            <span className='material-symbols-outlined' onClick={deleteHandler}>delete</span>
        </div>
    )
}

export default WorkoutDetails