export default function Movie ({id, posterImg, title, bigPoster}){
  
  return (
    <div className='absolute top-0 w-full h-screen'>
      {/* header */}
      <h1>{title}</h1>
      <div className='w-full'>
          <img
            id={id}
            src={`https://image.tmdb.org/t/p/original/${posterImg}`} 
            alt="Image"
            className='w-full'
          />
      </div>

      {/* 인기 콘텐츠 */}
      
  </div>
  );
}
