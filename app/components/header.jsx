export default function Header({id, title, headerImage}){
  return (
    <>
      <img src={`https://image.tmdb.org/t/p/original/${headerImage}`} alt="header-image" />
    </>
  )
}