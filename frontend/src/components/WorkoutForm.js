// library imports
import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'

// local imports
import { addNewWorkout } from '../features/WokroutsSlice'
import axiosInstance from '../api/axios'

const WokroutForm = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const resetForm = () => {
        setTitle('')
        setLoad('')
        setReps('')
        setError(null)
        setEmptyFields([])
    }

    const submitHandler = async (e) => {
        try {
            e.preventDefault()
            const workout = { title, load, reps }
            const { data } = await axiosInstance.post('/api/workouts', workout)
            dispatch(addNewWorkout(data))
            resetForm()
        } catch (error) {
            console.log('error in submitHandler', error)
            if (error.response.data.emptyFields.length) {
                setEmptyFields(error.response.data.emptyFields)
            }
            setError(error.response.data.error)
        }
    }

    return (
        <form className='create' onSubmit={submitHandler}>
            <h3>Add a New Workout</h3>

            <label>Excersize Title:</label>
            <input
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (kg):</label>
            <input
                type='number'
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input
                type='number'
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default WokroutForm