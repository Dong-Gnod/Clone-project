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
                  <Link key={movie.id} href={`detail/${movie.id}`} className='mr-36'>
                    <div className='w-36 mb-15 mr-15'>
                      <div></div>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt="Image"
                      />
                    </div>
                  </Link>
                )
              })
              .sort((a, b) => b.popularity - a.popularity)
              .slice(0, 5)
            }
          </div>
        </div>
  </div>  
  );
}
