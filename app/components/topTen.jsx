export default function TopTen ({id, posterImg, title}){

  return (
    <div className='w-40 h-60'>
      <div>
          <img
            id={id}
            src={`https://image.tmdb.org/t/p/original/${posterImg}`} 
            alt="Image"
            className='h-60'
          />
      </div>
  </div>
  );
}
