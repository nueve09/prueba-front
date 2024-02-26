export interface PaginationPage {
    page: number
    isActive: boolean
    navigate: () => void
}

export interface PaginationProps<T> {
    records: T[]
    page: number
    prevPage: () => void
    nextPage: () => void
    totalPages: number
    totalRecords: number
    recordsPerPage: number
    pages: PaginationPage[]
}