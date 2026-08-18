import type { LucideIcon } from 'lucide-react'
import {
  ArrowLeftRightIcon,
  CreditCardIcon,
  FilePlus2Icon,
  FolderKanbanIcon,
  HouseIcon,
  RefreshCcwIcon,
} from 'lucide-react'

export type AppNavItem = {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
}

export const APP_NAV_ITEMS: readonly AppNavItem[] = [
  { to: '/inicio', label: 'Inicio', icon: HouseIcon },
  { to: '/', label: 'Remesas', icon: ArrowLeftRightIcon, end: true },
  { to: '/tarjetas', label: 'Tarjetas', icon: CreditCardIcon },
  { to: '/pagos', label: 'Pagos', icon: FilePlus2Icon },
  { to: '/divisas', label: 'Divisas', icon: RefreshCcwIcon },
  { to: '/reportes', label: 'Reportes', icon: FolderKanbanIcon },
]
