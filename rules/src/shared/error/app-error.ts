import { StatusCodes } from 'http-status-codes'

interface AppErrorProps {
  message: string
  statusCode: StatusCodes
}

export class AppError extends Error {
  readonly statusCode: number

  constructor(props: AppErrorProps) {
    super(props.message)
    this.statusCode = props.statusCode
  }
}
