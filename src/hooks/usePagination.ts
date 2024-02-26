import { useEffect, useState } from 'react'
import { PaginationPage, PaginationProps } from '@/interfaces'

interface Props<T> {
    records: T[]
    recordsPerPage: number
}

export const usePagination = <T>({ records, recordsPerPage }: Props<T>): PaginationProps<T> => {
    const totalPages = Math.ceil(records.length / recordsPerPage)
    const [page, setPage] = useState(1)
    const [currentRecords, setcurrentRecords] = useState<T[]>([])
    let pages: PaginationPage[] = []

    for (let i = 1; i <= totalPages; i++) {
        pages.push({
            page: i,
            isActive: i === page,
            navigate: () => setPage(i)
        })
    }

    useEffect(() => {
        const start = recordsPerPage * (page - 1)
        const end = start + recordsPerPage

        setcurrentRecords(records.slice(start, end))
    }, [page, records])

    const prevPage = () => setPage(page === 1 ? 1 : page - 1)
    const nextPage = () => setPage(page === totalPages ? totalPages : page + 1)

    return {
        records: currentRecords,
        page,
        prevPage,
        nextPage,
        totalPages,
        totalRecords: records.length,
        recordsPerPage,
        pages,
    }
}