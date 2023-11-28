export default function Header({ id, headerImage }) {
  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden px-auto">
        <img
          id={id}
          src={`https://image.tmdb.org/t/p/original/${headerImage}`}
          alt="header-image"
        />
      </div>
    </>
  );
}
