import { LabelHTMLAttributes } from 'react'
import { Label } from '@/components/ui/label'

export function FormLabel(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <Label className="cursor-pointer" {...props} />
}
