/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form } from '@/shared/component/form'

const CreateManagerSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres.' })
    .regex(/^[a-zA-ZÀ-ÿ\s']*$/, { message: 'Nome deve conter apenas letras.' }),
  email: z.string().email({ message: 'Deve ser um e-mail válido.' }),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Senha deve ter no mínimo 8 caracteres.' })
    .regex(/[a-z]/, {
      message: 'Senha deve conter pelo menos uma letra minúscula.',
    })
    .regex(/[A-Z]/, {
      message: 'Senha deve conter pelo menos uma letra maiúscula.',
    })
    .regex(/[0-9]/, { message: 'Senha deve conter pelo menos um número.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Senha deve conter pelo menos um caractere especial.',
    }),
})

type CreateManagerFormData = z.infer<typeof CreateManagerSchema>

export function Register() {
  const formCreateManager = useForm<CreateManagerFormData>({
    resolver: zodResolver(CreateManagerSchema),
  })

  const { handleSubmit } = formCreateManager

  return (
    <main className="w-screen h-screen p-4">
      <h1 className="font-semibold text-xl text-center my-6">
        Criar gerente de plataforma
      </h1>
      <FormProvider {...formCreateManager}>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data)
          })}
          className="max-w-96 flex flex-col gap-2 m-auto mt-10 bg-primary-foreground p-4 shadow-sm"
        >
          <Form.Field>
            <Form.Label htmlFor="name">Nome</Form.Label>
            <Form.Input name="name" placeholder="digite seu nome" />
            <Form.ErrorMessage field="name" />
          </Form.Field>
          <Form.Field></Form.Field>
          <Form.Field>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Input name="email" placeholder="ex: email@email.com" />
            <Form.ErrorMessage field="email" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="password">Senha</Form.Label>
            <Form.InputPassword
              name="password"
              placeholder="digite sua senha"
            />
            <Form.ErrorMessage field="password" />
          </Form.Field>
          <Form.Field className="mt-4">
            <Form.Button>Criar</Form.Button>
          </Form.Field>
        </form>
      </FormProvider>
    </main>
  )
}
