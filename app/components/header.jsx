export default function Header({id, headerImage}){
  return (
    <>
      <div className='w-screen h-screen overflow-hidden text-center'>
        <img 
          id={id} 
          src={`https://image.tmdb.org/t/p/original/${headerImage}`} 
          alt="header-image"
        />
      </div>
    </>
  )
}