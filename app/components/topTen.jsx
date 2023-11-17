import Link from 'next/link';
import { Eight, Five, Four, Nine, One, Seven, Six, Ten, Three, Two } from '../components/icons/icons';

export default function TopTen ({movies}){
  const numbers = [One, Two, Three, Four, Five];
  return (
    <div className='w-full relative'>
        {/* <div className='flex justify-between ml-10'>
          {numbers
            .map((Number, index) => {
              return (
                <div key={index}>
                  <Number />
                </div>
              )
            })
          }
        </div> */}
        <div>
          <div className='flex justify-between ml-36 top-[10%] flex-wrap'>
            {movies
              .map((movie) => {
                return(
                  <Link key={movie.id} href={`detail/${movie.id}`} className='mr-12'>
                    <div className='flex w-full mb-20 mr-15'>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt="Image"
                        className='w-36'
                      />
                      <div className='w-36 flex flex-col ml-3 bg-gray-600/50 p-3 rounded-md'>
                        <h3 className='border-b-2 p-2 text-white text-center mb-3 font-extrabold'>{movie.title}</h3>
                        <p className='line-clamp-6'>{movie.overview}</p>
                      </div>
                    </div>
                  </Link>
                )
              })
              .sort((a, b) => b.popularity - a.popularity)
              .slice(0, 8)
            }
          </div>
        </div>
  </div>  
  );
}
