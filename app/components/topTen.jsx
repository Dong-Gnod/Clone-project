import Link from "next/link";

export default function TopTen({ movies }) {
  return (
    <div className="w-full relative">
      <div>
        <ul className="flex ml-36 top-[10%] flex-wrap">
          {movies
            .map((movie) => {
              if (movie.overview.length === 0) return;
              return (
                <Link
                  key={movie.id}
                  href={`detail/${movie.id}`}
                  className="mr-12">
                  {movie.overview === null ? null : (
                    <li className="grid grid-rows-2 grid-cols-5 w-96 h-72 mt-16 mb-20 mr-16 bg-gray-600/50 rounded-md">
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt="Image"
                        className="w-36 h-60 relative -top-20 col-start-1 col-end-3"
                      />

                      {/* <div className=" mt-24 flex flex-col "> */}
                      <div className="col-start-3 col-end-6 items-center text-center">
                        <h3 className="h-8 border-b-2 mt-10 mr-2 pb-10 text-white text-center font-extrabold whitespace-nowrap overflow-hidden text-ellipsis align-middle">
                          {movie.title}
                        </h3>
                      </div>

                      <p className="col-start-1 col-end-6 h-28 p-3 pt-8 leading-relaxed text-ellipsis">
                        <div className="line-clamp-3">{movie.overview}</div>
                      </p>
                      {/* </div> */}
                    </li>
                  )}
                </Link>
              );
            })
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 9)}
        </ul>
      </div>
    </div>
  );
}
