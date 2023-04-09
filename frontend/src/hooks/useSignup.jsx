import axios from "axios"
import { useState } from "react"
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {

    const [error, setError] = useState(null)
    const [isSuccess, setisSuccess] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (name, email, password, repeat_password) => {

        setisLoading(true)
        setError(null)

        await axios.post('/api/user/signup', {
            name,
            email,
            password,
            repeat_password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => {

            localStorage.setItem('user', JSON.stringify(data.data))
            dispatch({ type: 'LOGIN', payload: data.data })
            setisSuccess(true)
            setisLoading(false)
        }).catch(err => {
            setError(err.response.data.error)
            setisLoading(false)
            setisSuccess(false)
        })
    }

    return {
        signup, isLoading, error, isSuccess
    }
}