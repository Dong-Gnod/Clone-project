export default function Header({id, title, headerImage}){
  return (
    <>
      <div className='w-full h-screen'>
      <img 
        id={id} 
        src={`https://image.tmdb.org/t/p/original/${headerImage}`} 
        alt="header-image"
      />
      </div>

    </>
  )
}