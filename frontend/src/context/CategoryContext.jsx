import { createContext, useEffect, useReducer } from "react";

export const CategoryContext = createContext()

export const categoryReducer = (state, action) => {

    switch (action.type) {

        case 'GET_CATEGORY':
            return {
                category: action.payload
            }
        case 'CREATE_CATEGORY':
            return {
                category: [action.payload, ...state.category]
            }
        case 'DELETE_CATEGORY':
            return {
                category: state.category.filter((cat) => cat._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const CategoryContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(categoryReducer, {
        category: []
    })

    return (
        <CategoryContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CategoryContext.Provider>
    )
}