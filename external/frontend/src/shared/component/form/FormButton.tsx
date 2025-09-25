import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'

interface FormButtonProps {
  children: ReactNode
}

export function FormButton({ children }: FormButtonProps) {
  return (
    <Button
      type="submit"
      variant={'outline'}
      className="w-full bg-gradient-to-r from-green-500 to-indigo-400 text-gray-50 shadow-md hover:shadow-none hover:to-white hover:from-white hover:text-green-500 transition-all outline-indigo-400"
    >
      {children}
    </Button>
  )
}
