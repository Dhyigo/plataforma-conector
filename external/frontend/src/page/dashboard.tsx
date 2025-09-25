/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts'
import image from '../../public/img/background.png'
import { Header } from '@/shared/component/header'
import { data } from './data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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

      <main className="container flex justify-between gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Trafego</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={600} height={300} data={data} style={{}}>
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: '16px' }}
              />
              <XAxis
                dataKey="mes"
                tickLine={false}
                axisLine={false}
                interval={0}
                tick={{ fontSize: '16px' }}
              />
              <Tooltip />
              <Bar
                dataKey="trefego"
                radius={[4, 4, 0, 0]}
                barSize={24}
                style={
                  {
                    fill: 'hsl(var(--foreground))',
                    opacity: 0.9,
                  } as React.CSSProperties
                }
              />
            </BarChart>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Trafego</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={600} height={300} data={data} style={{}}>
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: '16px' }}
              />
              <XAxis
                dataKey="mes"
                tickLine={false}
                axisLine={false}
                interval={0}
                tick={{ fontSize: '16px' }}
              />
              <Tooltip />
              <Bar
                dataKey="trefego"
                radius={[4, 4, 0, 0]}
                barSize={24}
                style={
                  {
                    fill: 'hsl(var(--foreground))',
                    opacity: 0.9,
                  } as React.CSSProperties
                }
              />
            </BarChart>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
