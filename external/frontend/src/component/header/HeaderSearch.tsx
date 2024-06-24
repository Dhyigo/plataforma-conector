import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { FormEvent, useState } from 'react'

interface HeaderSearchProps {
  placeholder?: string
  onSubmit?: (search: string) => void
}

export function HeaderSearch(props: HeaderSearchProps) {
  const [search, setSearch] = useState<string>('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.onSubmit?.(search)
  }

  return (
    <form onSubmit={handleSubmit}>
      <search className="flex justify-between items-center gap-2">
        <Input
          placeholder={props.placeholder ?? 'Pesquise...'}
          value={search}
          onChange={({ target }) => {
            setSearch(target.value)
          }}
        />
        <Button variant="outline" type="submit">
          <Search size={16} />
        </Button>
      </search>
    </form>
  )
}
