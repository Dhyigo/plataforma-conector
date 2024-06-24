import { HTMLAttributes } from 'react'

type HeaderRootProps = HTMLAttributes<HTMLDivElement>

export function HeaderRoot(props: HeaderRootProps) {
  return (
    <>
      <div className="backdrop-blur-md"></div>
      <header className="fixed w-full top-0 bg-white/50 backdrop-blur-md border-b border-gray-200 p-2">
        <div className=" flex justify-between container items-center gap-10 p-h-64 p-1">
          <h1 className="text-3xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            HeadsCx
          </h1>
          <div
            className="flex justify-between items-center flex-1"
            {...props}
          />
        </div>
      </header>
    </>
  )
}
