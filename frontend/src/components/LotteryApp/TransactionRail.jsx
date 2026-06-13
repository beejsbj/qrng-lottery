import useStore from "../../store";

function shortHash(value) {
  if (!value) return "not submitted";
  return `${value.slice(0, 10)}...${value.slice(-8)}`;
}

function statusLabel(status) {
  return status.replace(/([A-Z])/g, " $1").toLowerCase();
}

function latestEvent(transaction) {
  if (!transaction || !transaction.events.length) return "Waiting for event";
  return transaction.events[transaction.events.length - 1].name;
}

export default function TransactionRail() {
  const notice = useStore((state) => state.web3Demo.notice);
  const transactions = useStore((state) => state.web3Demo.transactions);
  const activeTransactionId = useStore(
    (state) => state.web3Demo.activeTransactionId
  );
  const lottery = useStore((state) => state.web3Demo.lottery);
  const clearNotice = useStore((state) => state.web3Demo.clearNotice);

  const activeTransaction =
    transactions.find((transaction) => transaction.id === activeTransactionId) ||
    transactions[0];
  const recentTransactions = transactions.slice(0, 3);

  return (
    <transaction-rail class="slide-in-left">
      <header>
        <h2 className="teaser-voice">contract receipts</h2>
        <p className="notice-voice">week {lottery.week}</p>
      </header>

      {notice && (
        <div className="web3-notice">
          <p>{notice}</p>
          <button onClick={clearNotice} type="button" aria-label="Dismiss">
            x
          </button>
        </div>
      )}

      {!activeTransaction && (
        <div className="empty-receipt">
          <p>Connect, submit, and the contract trail prints here.</p>
        </div>
      )}

      {activeTransaction && (
        <article className={`receipt-card ${activeTransaction.status}`}>
          <div className="receipt-stamp">
            {statusLabel(activeTransaction.status)}
          </div>
          <dl>
            <div>
              <dt>Hash</dt>
              <dd>{shortHash(activeTransaction.hash)}</dd>
            </div>
            <div>
              <dt>Method</dt>
              <dd>{activeTransaction.method}</dd>
            </div>
            <div>
              <dt>Value</dt>
              <dd>{activeTransaction.valueEth} ETH</dd>
            </div>
            <div>
              <dt>Confirmations</dt>
              <dd>{activeTransaction.confirmations}/3</dd>
            </div>
            <div>
              <dt>Event</dt>
              <dd>{latestEvent(activeTransaction)}</dd>
            </div>
            {activeTransaction.requestId && (
              <div>
                <dt>Request</dt>
                <dd>{shortHash(activeTransaction.requestId)}</dd>
              </div>
            )}
            {activeTransaction.winningNumber && (
              <div>
                <dt>Winner</dt>
                <dd>{activeTransaction.winningNumber}</dd>
              </div>
            )}
          </dl>

          <ol className="timeline">
            {activeTransaction.timeline.map((item, index) => (
              <li key={`${activeTransaction.id}-${index}`}>{item.label}</li>
            ))}
          </ol>
        </article>
      )}

      {recentTransactions.length > 1 && (
        <ol className="receipt-history">
          {recentTransactions.slice(1).map((transaction) => (
            <li key={transaction.id}>
              <span>{statusLabel(transaction.status)}</span>
              <span>{shortHash(transaction.hash)}</span>
            </li>
          ))}
        </ol>
      )}
    </transaction-rail>
  );
}
