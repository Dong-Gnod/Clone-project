import Link from 'next/link';
import { Eight, Five, Four, Nine, One, Seven, Six, Ten, Three, Two } from '../components/icons/icons';

export default function TopTen ({movies}){
  const numbers = [One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten];
  return (
    <div className='w-full relative'>
        <div className='flex justify-between ml-10'>
          {numbers
            .map((Number, index) => {
              return (
                <div key={index}>
                  <Number />
                </div>
              )
            })
          }
        </div>
        <div>
        <div className='flex justify-between absolute ml-36 top-[5%]'>
          {movies
            .map((movie) => {
              return(
                <Link key={movie.id} href={`detail/${movie.id}`} className='w-36 mr-36'>
                  <div className='w-36 mb-7'>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt="Image"
                    />
                  </div>
                </Link>
              )
            })
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 10)
          }
          </div>
        </div>
  </div>
  );
}
