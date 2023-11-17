export default function Movie ({id, posterImg, title}){
  return (
    <div className='w-72'>
      <h1 className='bg-gray-600/50 p-3 rounded-md'>{title}</h1>
      <div>
          <img
            id={id}
            src={`https://image.tmdb.org/t/p/original/${posterImg}`} 
            alt="Image"
          />
      </div>
  </div>
  );
}
