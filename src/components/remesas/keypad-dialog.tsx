import { useEffect, useState } from 'react'
import { CalculatorIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { RemesaKeypad } from '@/components/remesas/keypad'

const desktopViewport = '(min-width: 1024px)'

export const RemesaKeypadDialog = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(desktopViewport)
    const closeOnDesktop = () => {
      if (media.matches) {
        setOpen(false)
      }
    }

    media.addEventListener('change', closeOnDesktop)
    return () => {
      media.removeEventListener('change', closeOnDesktop)
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-kiosk-action text-kiosk-action-foreground hover:bg-kiosk-action/90"
        >
          <CalculatorIcon data-icon="inline-start" />
          Cobrar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100svh-2rem)] overflow-hidden bg-kiosk sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-kiosk-accent">
            Cobrar remesa
          </DialogTitle>
          <DialogDescription className="sr-only">
            Ingresa el identificador de la remesa para cobrarla
          </DialogDescription>
        </DialogHeader>
        <RemesaKeypad onCharged={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
