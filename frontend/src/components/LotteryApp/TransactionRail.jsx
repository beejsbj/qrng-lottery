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

function receiptLines(transaction) {
  return [
    ["Hash", shortHash(transaction.hash)],
    ["Method", transaction.method],
    ["Value", `${transaction.valueEth} ETH`],
    ["Confirmations", `${transaction.confirmations}/3`],
    ["Event", latestEvent(transaction)],
    transaction.requestId && ["Request", shortHash(transaction.requestId)],
    transaction.winningNumber && ["Winner", transaction.winningNumber],
  ].filter(Boolean);
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
          <div
            className="receipt-stamp"
            aria-label={`status ${statusLabel(activeTransaction.status)}`}
          >
            {statusLabel(activeTransaction.status)}
          </div>
          <dl className="receipt-lines">
            {receiptLines(activeTransaction).map(([label, value], index) => (
              <div
                key={`${activeTransaction.id}-${label}`}
                style={{ "--line-index": index }}
              >
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <ol className="timeline">
            {activeTransaction.timeline.map((item, index) => (
              <li
                key={`${activeTransaction.id}-${index}`}
                style={{ "--line-index": index + 7 }}
              >
                {item.label}
              </li>
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
