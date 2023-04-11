
import { useContext } from "react"
import { CategoryContext } from "../context/CategoryContext"

export const useCategoryContext = () => {

    const context = useContext(CategoryContext)

    if (!context) {
        throw Error('context must be inside the context provider')
    }

    return context
}