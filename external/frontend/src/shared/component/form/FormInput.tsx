import { Input } from '@/components/ui/input'
import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export function FormInput(props: FormInputProps) {
  const { register } = useFormContext()

  return (
    <Input id={props.name} className="" {...register(props.name)} {...props} />
  )
}
