import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components'
import { useAppDispatch } from '@/hooks'
import { filterRemittances } from '@/store/remittances'

export const FilterBar = () => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const [filterTerm, setFilterTerm] = useState('')
    const [debouncedFilterTerm, setDebouncedFilterTerm] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const debounceTimeout = useRef<ReturnType<typeof setTimeout>>()

    useEffect(() => {
        if (open) inputRef.current?.focus()
    }, [open])

    useEffect(() => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current)

        debounceTimeout.current = setTimeout(() => {
            setDebouncedFilterTerm(filterTerm)
        }, 500)
    }, [filterTerm])

    useEffect(() => {
        dispatch(filterRemittances(debouncedFilterTerm))
    }, [debouncedFilterTerm])

    if (!open) return (
        <Button title="Buscar" color="outline-primary" onClick={() => setOpen(true)}>
            <i className="fa-solid fa-search"></i>
        </Button>
    )

    return (
        <div className="filter-bar" title="Buscar">
            <i
                className="fa-solid fa-circle-xmark"
                onClick={() => {
                    setOpen(false)
                    setFilterTerm('')
                }}
            ></i>
            <input
                ref={inputRef}
                placeholder="Busca id, compañia o monto"
                value={filterTerm}
                onChange={({ target: { value } }) => setFilterTerm(value)}
            />
        </div>
    )
}