import { BrowserRouter, Route, Routes } from 'react-router'

import { AppShell } from '@/components/layout/app-shell'
import { PlaceholderPage } from '@/components/layout/placeholder-page'
import { RemesasPage } from '@/components/remesas/remesas-page'
import { Toaster } from '@/components/ui/toast'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<RemesasPage />} />
          <Route path="inicio" element={<PlaceholderPage title="Inicio" />} />
          <Route
            path="tarjetas"
            element={<PlaceholderPage title="Tarjetas" />}
          />
          <Route path="pagos" element={<PlaceholderPage title="Pagos" />} />
          <Route path="divisas" element={<PlaceholderPage title="Divisas" />} />
          <Route
            path="reportes"
            element={<PlaceholderPage title="Reportes" />}
          />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
