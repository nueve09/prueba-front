export interface PaginationRequest<T extends object = any> {
    pageSize?: number
    page?: number
    sortColumn?: keyof T
    sortDirection?: 'asc' | 'desc'
}

export interface PaginationResponse<T extends object = any> {
    rows: T[]
    count: number
}