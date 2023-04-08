import axios from "axios"
import { useState } from "react"
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {

    const [error, setError] = useState(null)
    const [isLoading, setisLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {

        setisLoading(true)
        setError(null)

        await axios.post('/api/user/login', {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => {

            localStorage.setItem('user', JSON.stringify(data.data.user))

            dispatch({ type: 'LOGIN', payload: data.data.user })

            setisLoading(false)

            window.location.replace('/login')
        }).catch(err => {
            setError(err.response.data.error)
            setisLoading(false)
        })
    }

    return {
        login, isLoading, error
    }
}