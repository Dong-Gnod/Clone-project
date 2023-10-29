import Image from 'next/image'
import { Nav } from './components/Nav';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-0">
      {/* 만들어야 할 것
      1.nav
      2.header
      3.main -> slide */}
      {/* navigation */}
      <Nav />
      {/* header */}
      {/* contents */}
    </main>
  )
}
