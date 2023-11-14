export default function Movie ({id, posterImg, title}){
  return (
    <div>
      <h1>{title}</h1>
      <div>
          <img
            id={id}
            src={`https://image.tmdb.org/t/p/original/${posterImg}`} 
            alt="Image"
            className='w-72'
          />
      </div>
  </div>
  );
}
