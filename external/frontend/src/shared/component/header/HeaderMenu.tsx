import { HTMLAttributes } from 'react'

type HeaderMenuProps = HTMLAttributes<HTMLUListElement>
export function HeaderMenu(props: HeaderMenuProps) {
  return (
    <nav>
      <ul className="flex gap-4" {...props} />
    </nav>
  )
}
