import { Button } from '@/components/ui/button'
import { useAppStore } from '@/stores/app-store'

const App = () => {
  const count = useAppStore((state) => state.count)

  const handleIncrement = () => {
    useAppStore.getState().increment()
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-xl flex-col justify-center gap-6 px-6 py-16">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">N09 · Front-end</p>
        <h1 className="text-3xl font-medium tracking-tight">Prueba Front</h1>
        <p className="text-muted-foreground">
          Stack listo con Vite, React, TypeScript, Tailwind, shadcn/ui, Zustand
          y Zod. El ejercicio de remesas todavía no está implementado.
        </p>
      </div>
      <Button type="button" onClick={handleIncrement}>
        Count is {count}
      </Button>
    </main>
  )
}

export default App
