import image from '../../public/img/background.png'
import { Header } from '@/component/header'

export function Dashboard() {
  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className="bg-no-repeat bg-cover w-screen h-screen"
    >
      <Header.Root>
        <Header.Menu>
          {Array.from({ length: 4 }).map(() => {
            return <Header.MenuItem key={Math.random()}>dsgdhs</Header.MenuItem>
          })}
        </Header.Menu>
        <Header.Tools>
          <Header.Search
            onSubmit={() => {
              alert('Pesquisando...')
            }}
          />
          <Header.Perfil />
        </Header.Tools>
      </Header.Root>

      <main className="container">
        {Array.from({ length: 10 }).map(() => {
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
