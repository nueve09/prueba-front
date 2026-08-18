import { NavLink } from 'react-router'

import { APP_NAV_ITEMS } from '@/config/nav'
import { cn } from '@/lib/utils'

export const IconRail = () => {
  return (
    <nav
      aria-label="Principal"
      className="print:hidden hidden h-svh flex-col items-center gap-6 bg-kiosk-deep py-5 lg:flex"
    >
      <span className="flex size-10 items-center justify-center rounded-lg bg-kiosk text-lg font-heading font-extrabold text-kiosk-accent">
        n
      </span>
      <ul className="flex flex-col items-center gap-3">
        {APP_NAV_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                aria-label={item.label}
                className={({ isActive }) =>
                  cn(
                    'flex size-10 items-center justify-center rounded-lg text-kiosk-foreground/70 transition-colors hover:bg-kiosk hover:text-kiosk-foreground',
                    isActive && 'bg-kiosk text-kiosk-accent',
                  )
                }
              >
                <Icon />
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
