/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form } from '@/shared/component/form'

const loginSchema = z.object({
  email: z.string().email({ message: 'Deve ser um E-mail válido.' }),
  password: z.string().trim().min(8, 'Senha deve ter mínimo de 8.'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function Login() {
  const formLogin = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const { handleSubmit } = formLogin

  return (
    <main className="w-screen h-screen p-4">
      <h1 className="font-semibold text-xl text-center my-6">
        Entrar como gerente de plataforma
      </h1>
      <FormProvider {...formLogin}>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data)
          })}
          className="max-w-96 flex flex-col gap-2 m-auto mt-10 bg-primary-foreground p-4 shadow-sm"
        >
          <Form.Field>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Input name="email" placeholder="ex: email@email.com" />
            <Form.ErrorMessage field="email" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="password">Senha</Form.Label>
            <Form.Input
              name="password"
              placeholder="digite sua senha"
              type="password"
            />
            <Form.ErrorMessage field="password" />
          </Form.Field>
          <Form.Field className="mt-4">
            <Form.Button>Entrar</Form.Button>
          </Form.Field>
        </form>
      </FormProvider>
    </main>
  )
}
