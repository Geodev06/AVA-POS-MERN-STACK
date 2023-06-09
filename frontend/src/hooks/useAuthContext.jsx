import { AuthContext } from "../context/AuthContext"

import { useContext } from "react"

export const useAuthContext = () => {

    const context = useContext(AuthContext)

    if (!context) {
        throw Error('context must be inside the context provider')
    }

    return context
}