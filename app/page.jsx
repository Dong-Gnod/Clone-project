import { Nav } from './components/Nav';
import { Movie } from './components/Movie'

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-0">
      {/* navigation */}
      <Nav />

      {/* Main */}
      <Movie />
    </main>
  )
}
