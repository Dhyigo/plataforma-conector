import { HTMLAttributes } from 'react'

type HeaderToolsProps = HTMLAttributes<HTMLDivElement>

export function HeaderTools(props: HeaderToolsProps) {
  return <div className="flex justify-between items-center gap-8" {...props} />
}
