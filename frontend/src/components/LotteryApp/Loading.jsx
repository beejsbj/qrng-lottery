import { useEffect, useState } from "react";
import Store from "../../store";

export default function Loading(props) {
  const isResetLoading = Store((state) => state.reset.loadingContract);
  const isTicketLoading = Store((state) => state.ticket.loadingContract);
  const [state, setState] = useState({ loadingClassname: "loading-screen" });

  useEffect(() => {
    if (isResetLoading.status || isTicketLoading.status) {
      setState({ loadingClassname: "loading-screen" });
    } else {
      setState({ loadingClassname: "loading-screen hide-loading" });
    }
  }, [isResetLoading.status, isTicketLoading.status]);

  return (
    <div className={state.loadingClassname}>
      <div className="container">
        <h1 className="booming-voice">
          {isResetLoading.status ? isResetLoading.message : ""}
          {isTicketLoading.status ? isTicketLoading.message : ""}
        </h1>
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
