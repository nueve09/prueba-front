import { useState } from 'react'
import { PrinterIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Separator } from '@/components/ui/separator'
import { RemesaKeypadDialog } from '@/components/remesas/keypad-dialog'
import { useDebounce } from '@/hooks/use-debounce'
import { useRemesasFilter } from '@/hooks/use-remesas-filter'
import { formatLongDate } from '@/lib/dates'
import { formatRemesaAmount, formatRemesaId } from '@/lib/format'
import type { Remesa } from '@/lib/schemas'

type RemesaHistoryPanelProps = {
  remesas: Remesa[]
  isLoading: boolean
}

const pageItems = (pageCount: number) =>
  Array.from({ length: pageCount }, (_, index) => index + 1)

export const RemesaHistoryPanel = ({
  remesas,
  isLoading,
}: RemesaHistoryPanelProps) => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const debouncedQuery = useDebounce(query, 300)
  const filtered = useRemesasFilter(remesas, debouncedQuery, page)

  const handlePrint = () => {
    window.print()
  }

  return (
    <aside className="flex h-full min-h-0 flex-col bg-background px-5 py-6 text-foreground">
      <header className="print:block flex flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="font-heading text-2xl font-extrabold text-kiosk-accent lg:hidden">
              Remesas
            </h1>
            <p className="text-sm font-semibold text-kiosk-action">Hoy</p>
            <p className="text-sm capitalize">{formatLongDate(new Date())}</p>
          </div>
          <div className="print:hidden lg:hidden">
            <RemesaKeypadDialog />
          </div>
        </div>
        <div className="print:hidden flex items-center gap-2">
          <Input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
            placeholder="Buscar por id, compañía o monto"
            aria-label="Buscar remesas"
          />
          <Button
            type="button"
            variant="outline"
            aria-label="Imprimir"
            onClick={handlePrint}
          >
            <PrinterIcon />
          </Button>
        </div>
      </header>
      <Separator className="my-4" />
      <div className="min-h-0 flex-1 overflow-y-auto">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Cargando remesas…</p>
        ) : null}
        {!isLoading && filtered.items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No hay remesas cobradas para mostrar.
          </p>
        ) : null}
        <ul>
          {filtered.items.map((remesa) => (
            <li key={remesa.id}>
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3 text-sm">
                <span className="font-medium">{formatRemesaId(remesa.id)}</span>
                <span className="truncate text-center text-muted-foreground">
                  {remesa.company}
                </span>
                <span className="tabular-nums">
                  {formatRemesaAmount(remesa.amount)}
                </span>
              </div>
              <Separator />
            </li>
          ))}
        </ul>
      </div>
      {filtered.pageCount > 1 ? (
        <Pagination className="print:hidden mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                text="Anterior"
                onClick={(event) => {
                  event.preventDefault()
                  setPage(Math.max(1, filtered.page - 1))
                }}
              />
            </PaginationItem>
            {pageItems(filtered.pageCount).map((item) => (
              <PaginationItem key={item}>
                <PaginationLink
                  href="#"
                  isActive={item === filtered.page}
                  onClick={(event) => {
                    event.preventDefault()
                    setPage(item)
                  }}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                text="Siguiente"
                onClick={(event) => {
                  event.preventDefault()
                  setPage(Math.min(filtered.pageCount, filtered.page + 1))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </aside>
  )
}
