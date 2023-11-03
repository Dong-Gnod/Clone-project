import { Nav } from './components/Nav';
import { Movie } from './components/Movie'

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-0">
      <div className='relative w-full m-0'>
        {/* navigation */}
        <Nav className='z-[100]' />

        {/* Main */}
        <Movie />
      </div>
    </main>
  )
}
