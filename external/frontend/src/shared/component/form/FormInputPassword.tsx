import { InputPassword } from '@/components/ui/input-password'
import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export function FormInputPassword(props: FormInputProps) {
  const { register } = useFormContext()

  return <InputPassword id={props.name} {...register(props.name)} {...props} />
}
