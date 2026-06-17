import { useEffect, useState } from "react";
import Store from "../../store";
import starsSeal from "../../assets/stars.svg";

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
      <div className="container loading-receipt">
        <p className="teaser-voice">contract printer</p>
        <h1 className="attention-voice">
          {isResetLoading.status ? isResetLoading.message : ""}
          {isTicketLoading.status ? isTicketLoading.message : ""}
        </h1>
        <div className="receipt-feed" aria-hidden="true">
          <span>checking method signature</span>
          <span>counting confirmations</span>
          <span>inking receipt seal</span>
        </div>
        <div className="pictures" aria-hidden="true">
          <picture>
            <img src={starsSeal} alt="" />
          </picture>
        </div>
      </div>
    </div>
  );
}
