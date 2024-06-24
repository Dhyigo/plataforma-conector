import { HTMLAttributes } from 'react'

type HeaderMenuItemProps = HTMLAttributes<HTMLAnchorElement>

export function HeaderMenuItem(props: HeaderMenuItemProps) {
  return (
    <li key={Math.random()}>
      <a className="font-semibold hover:text-green-500" {...props} />
    </li>
  )
}
