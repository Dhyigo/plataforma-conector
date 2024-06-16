import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import image from '../../public/img/background.png'
import { Button } from '@/components/ui/button'
import { CircleUser, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function Dashboard() {
  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className="bg-no-repeat bg-cover w-screen h-screen"
    >
      <div className="backdrop-blur-md"></div>
      <header className="fixed w-full top-0 bg-white/50 backdrop-blur-md border-b border-gray-200 p-2">
        <div className=" flex justify-between container items-center gap-10 p-h-64 p-1">
          <h1 className="text-3xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            HeadsCx
          </h1>
          <div className="flex justify-between items-center flex-1">
            <nav>
              <ul className="flex gap-4">
                {Array.from({ length: 4 }).map(() => {
                  return (
                    <li key={Math.random()}>
                      <a
                        href="#"
                        className="font-semibold hover:text-green-500"
                      >
                        Item ghgash
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
            <div className="flex justify-between items-center gap-8">
              <search className="flex justify-between items-center gap-2">
                <Input placeholder="Pesquise..." />
                <Button variant="outline">
                  <Search size={16} />
                </Button>
              </search>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex justify-center items-center focus-visible:outline-none"
                  >
                    <CircleUser size={24} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      <div className="h-20"></div>
      <main className="container">
        {Array.from({ length: 0 }).map(() => {
          return (
            <p key={Math.random()}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              saepe atque, aliquam maxime nostrum cum perspiciatis recusandae
              commodi ea hic, qui laboriosam aut id sequi culpa quia dignissimos
              voluptas ut?
            </p>
          )
        })}
      </main>
    </div>
  )
}
