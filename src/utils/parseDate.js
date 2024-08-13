const parseDate = (date) => {
    const year = date.slice(0,4)
    const month = date.slice(4,6)
    const day = date.slice(6)
    const parsedDate = `${year}-${month}-${day}`
    return parsedDate
}

export {parseDate}