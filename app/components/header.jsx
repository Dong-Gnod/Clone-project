export default function Header({ id, headerImage }) {
  return (
    <>
      <div className="flex justify-center relative w-screen h-screen overflow-hidden">
        <img
          id={id}
          src={`https://image.tmdb.org/t/p/original/${headerImage}`}
          alt="header-image"
        />
      </div>
    </>
  );
}
