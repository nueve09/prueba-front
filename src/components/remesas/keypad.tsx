import { useState } from 'react'
import { CornerDownLeftIcon, DeleteIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { submitRemesaCharge } from '@/lib/charge-remesa'
import { cn } from '@/lib/utils'
import { useRemesasStore } from '@/stores/remesas-store'

const NUMBER_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const

const numberKeyClassName =
  'h-full min-h-0 w-full rounded-full bg-kiosk-key text-xl font-semibold text-kiosk hover:bg-kiosk-key/90'

type RemesaKeypadProps = {
  onCharged?: () => void
}

const digitCount = (value: string) => value.replaceAll('.', '').length

const formatDisplay = (value: string) =>
  value.length > 0 ? value.split('').join(' ') : ''

export const RemesaKeypad = ({ onCharged }: RemesaKeypadProps) => {
  const [value, setValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isReady = useRemesasStore((state) => state.status === 'ready')

  const appendDigit = (digit: string) => {
    setValue((current) => {
      if (digitCount(current) >= 8) {
        return current
      }
      return `${current}${digit}`
    })
  }

  const appendPeriod = () => {
    setValue((current) => (current.includes('.') ? current : `${current}.`))
  }

  const handleBackspace = () => {
    setValue((current) => current.slice(0, -1))
  }

  const handleConfirm = () => {
    if (isSubmitting || !isReady) {
      return
    }

    setIsSubmitting(true)
    void submitRemesaCharge(value)
      .then((ok) => {
        if (ok) {
          setValue('')
          onCharged?.()
        }
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-md flex-col gap-6">
      <output
        aria-live="polite"
        className="flex min-h-14 items-center rounded-full bg-kiosk-key px-6 font-heading text-2xl font-semibold tracking-[0.35em] text-kiosk"
      >
        {formatDisplay(value)}
      </output>
      <div className="grid grid-cols-4 grid-rows-[repeat(4,minmax(2.75rem,4rem))] gap-3">
        {NUMBER_KEYS.map((key, index) => (
          <Button
            key={key}
            type="button"
            variant="secondary"
            className={numberKeyClassName}
            style={{
              gridColumnStart: (index % 3) + 1,
              gridRowStart: Math.floor(index / 3) + 1,
            }}
            onClick={() => appendDigit(key)}
          >
            {key}
          </Button>
        ))}
        <Button
          type="button"
          variant="secondary"
          aria-label="Borrar"
          className="col-start-4 row-span-2 row-start-1 h-full min-h-0 w-full rounded-full bg-kiosk-deep text-kiosk-foreground hover:bg-kiosk-deep/80"
          onClick={handleBackspace}
        >
          <DeleteIcon />
        </Button>
        <Button
          type="button"
          variant="secondary"
          className={cn(numberKeyClassName, 'col-span-2 col-start-1 row-start-4')}
          onClick={() => appendDigit('0')}
        >
          0
        </Button>
        <Button
          type="button"
          variant="secondary"
          className={cn(numberKeyClassName, 'col-start-3 row-start-4')}
          onClick={appendPeriod}
        >
          .
        </Button>
        <Button
          type="button"
          aria-label="Cobrar remesa"
          disabled={isSubmitting || !isReady}
          className="col-start-4 row-span-2 row-start-3 h-full min-h-0 w-full rounded-full bg-kiosk-action text-kiosk-action-foreground hover:bg-kiosk-action/90"
          onClick={handleConfirm}
        >
          <CornerDownLeftIcon />
        </Button>
      </div>
    </div>
  )
}
