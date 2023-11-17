export default function Header({id, headerImage}){
  return (
    <>
      <div className='max-w-screen-3xl h-screen overflow-hidden text-center items-center'>
        <img 
          id={id} 
          src={`https://image.tmdb.org/t/p/original/${headerImage}`} 
          alt="header-image"
        />
      </div>
    </>
  )
}