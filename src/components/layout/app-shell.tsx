import { Outlet } from 'react-router'

import { IconRail } from '@/components/layout/icon-rail'
import { MobileTabs } from '@/components/layout/mobile-tabs'

export const AppShell = () => {
  return (
    <div className="grid h-svh grid-rows-[minmax(0,1fr)_auto] bg-kiosk lg:grid-cols-[4.5rem_minmax(0,1fr)] lg:grid-rows-none">
      <IconRail />
      <div className="min-h-0 min-w-0 overflow-hidden">
        <Outlet />
      </div>
      <MobileTabs />
    </div>
  )
}
