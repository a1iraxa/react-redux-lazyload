export const increment = (nbr) => {
    return {
        type: "INCREMENT",
        payload: nbr
    }
}

export const decrement = () => {
    return {
        type: "DECREMENT"
    }
}
