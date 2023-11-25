import Link from "next/link";

export default function TopTen({ movies }) {
  return (
    <div className="w-full relative">
      <div>
        <ul className="flex justify-between ml-36 top-[10%] flex-wrap">
          {movies
            .map((movie) => {
              return (
                <Link
                  key={movie.id}
                  href={`detail/${movie.id}`}
                  className="mr-12">
                  <li className="flex w-full mb-20 mr-15">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt="Image"
                      className="w-36"
                    />

                    <div className="w-36 flex flex-col ml-3 bg-gray-600/50 p-3 rounded-md">
                      <h3 className="border-b-2 p-2 text-white text-center mb-3 font-extrabold">
                        {movie.title}
                      </h3>
                      <p className="line-clamp-6">{movie.overview}</p>
                    </div>
                  </li>
                </Link>
              );
            })
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 8)}
        </ul>
      </div>
    </div>
  );
}
