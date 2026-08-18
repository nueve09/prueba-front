import { toast } from '@/components/ui/toast-manager'

import { formatUnknownError } from '@/lib/errors'
import { remesaIdSchema } from '@/lib/schemas'
import { useRemesasStore } from '@/stores/remesas-store'

export const submitRemesaCharge = async (rawId: string): Promise<boolean> => {
  const parsed = remesaIdSchema.safeParse(rawId)
  if (!parsed.success) {
    toast.add({
      title: formatUnknownError(parsed.error),
      type: 'error',
    })
    return false
  }

  try {
    await useRemesasStore.getState().charge(parsed.data)
    return true
  } catch (error) {
    toast.add({
      title: formatUnknownError(error),
      type: 'error',
    })
    return false
  }
}
