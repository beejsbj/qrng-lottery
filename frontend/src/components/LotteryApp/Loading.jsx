import Store from "../../store";

export default function Loading(props) {
  const isResetLoading = Store((state) => state.reset.loadingContract);
  let classname;
  if (isResetLoading) {
    console.log("loading");
    classname = "loading-screen";
  } else {
    console.log("not loading");
    classname = "loading-screen hide";
  }

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
    <div className={classname}>
      <div className="container">
        <h1 className="booming-voice">WAAIT {isResetLoading}</h1>
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
