export default function Loading(props) {
  //animation that makes each letter of h1 bounce
  //   const letters = document.querySelectorAll("loading-screen .booming-voice");
  //   letters.forEach((letter) => {
  //     letter.addEventListener("animationend", (e) => {
  //       e.target.classList.remove("animated", "bounce");
  //     });
  //     letter.addEventListener("animationstart", (e) => {
  //       e.target.classList.add("animated", "bounce");
  //     });
  //   });

  return (
    <div className="loading-screen hide">
      <div className="container">
        <h1 className="booming-voice">WAAIT</h1>
        <div className="pictures">
          <picture>
            <img src="/src/assets/stars.svg" alt="" />
          </picture>
          <picture>
            <img src="/src/assets/stars.svg" alt="" />
          </picture>
          <picture>
            <img src="/src/assets/stars.svg" alt="" />
          </picture>
        </div>
      </div>
    </div>
  );
}
