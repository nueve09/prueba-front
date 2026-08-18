import { useLocation, useNavigate } from 'react-router'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { APP_NAV_ITEMS } from '@/config/nav'

export const MobileTabs = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav
      aria-label="Principal"
      className="print:hidden border-t bg-kiosk-deep p-2 lg:hidden"
    >
      <Tabs
        value={location.pathname}
        onValueChange={(path) => {
          void navigate(path)
        }}
      >
        <TabsList className="h-auto w-full bg-transparent p-0">
          {APP_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <TabsTrigger
                key={item.to}
                value={item.to}
                aria-label={item.label}
                className="flex-1 text-kiosk-foreground/70 data-active:bg-kiosk data-active:text-kiosk-accent"
              >
                <Icon />
                <span className="sr-only">{item.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>
      </Tabs>
    </nav>
  )
}
