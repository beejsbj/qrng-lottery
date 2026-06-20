const WALLET_STORAGE_KEY = "qrng-lottery-demo-wallet";
const TX_STORAGE_KEY = "qrng-lottery-demo-transactions";
const TERMINAL_TRANSACTION_STATUSES = new Set(["receiptReady", "rejected"]);
const PENDING_TRANSACTION_STATUSES = new Set([
  "submitted",
  "pending",
  "confirming",
  "confirmed",
]);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function disconnectedWallet() {
  return {
    status: "disconnected",
    address: null,
    balance: null,
    chainId: 1337,
    chainName: "QRNG Demo Chain",
  };
}

function readJson(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function randomHex(length) {
  const chars = "0123456789abcdef";
  let value = "";
  for (let i = 0; i < length; i++) {
    value += chars[Math.floor(Math.random() * chars.length)];
  }
  return value;
}

function makeWallet() {
  return {
    status: "connected",
    address: `0x${randomHex(40)}`,
    balance: `${(1 + Math.random() * 2).toFixed(3)} demo ETH`,
    chainId: 1337,
    chainName: "QRNG Demo Chain",
  };
}

function makeId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${randomHex(6)}`;
}

function nowIso() {
  return new Date().toISOString();
}

function normalizeWallet(wallet) {
  if (wallet && wallet.status === "connected" && wallet.address) return wallet;
  return disconnectedWallet();
}

function persistableTransactions(transactions) {
  return Array.isArray(transactions)
    ? transactions.filter(
        (transaction) =>
          transaction &&
          transaction.id &&
          Array.isArray(transaction.events) &&
          Array.isArray(transaction.timeline) &&
          TERMINAL_TRANSACTION_STATUSES.has(transaction.status)
      )
    : [];
}

function initialWallet() {
  const wallet = normalizeWallet(
    readJson(WALLET_STORAGE_KEY, disconnectedWallet())
  );
  writeJson(WALLET_STORAGE_KEY, wallet);
  return wallet;
}

function initialTransactions() {
  const transactions = persistableTransactions(readJson(TX_STORAGE_KEY, []));
  writeJson(TX_STORAGE_KEY, transactions);
  return transactions;
}

function ticketIntent(get) {
  const amount = get().ticket.amount;
  const selected = get().numbers.selected;

  return {
    id: makeId("intent"),
    type: "ticketPurchase",
    label: "Buy lottery tickets",
    method: "enter",
    signature: "enter(uint256[] numbers, uint256 numberOfTickets)",
    numbers: selected,
    tickets: amount,
    valueEth: (amount * 0.001).toFixed(3),
    expectedEvent: "TicketEntered",
  };
}

function drawIntent() {
  return {
    id: makeId("intent"),
    type: "drawWinner",
    label: "Draw winning number",
    method: "getWinningNumber",
    signature: "getWinningNumber()",
    numbers: [],
    tickets: 0,
    valueEth: "0.010",
    expectedEvent: "RequestedRandomNumber",
  };
}

export const web3Demo = (set, get) => {
  let connectSequence = 0;

  function updateDemo(patch) {
    set((state) => ({
      ...state,
      web3Demo: {
        ...state.web3Demo,
        ...patch,
      },
    }));
  }

  function updateWallet(wallet) {
    writeJson(WALLET_STORAGE_KEY, normalizeWallet(wallet));
    updateDemo({ wallet });
  }

  function updateTransactions(updater) {
    set((state) => {
      const transactions =
        typeof updater === "function"
          ? updater(state.web3Demo.transactions)
          : updater;
      writeJson(TX_STORAGE_KEY, persistableTransactions(transactions));

      return {
        ...state,
        web3Demo: {
          ...state.web3Demo,
          transactions,
        },
      };
    });
  }

  function patchTransaction(id, patch) {
    updateTransactions((transactions) =>
      transactions.map((transaction) =>
        transaction.id === id
          ? {
              ...transaction,
              ...(typeof patch === "function" ? patch(transaction) : patch),
              updatedAt: nowIso(),
            }
          : transaction
      )
    );
  }

  function addTimeline(id, label) {
    patchTransaction(id, (transaction) => ({
      timeline: [
        ...transaction.timeline,
        {
          label,
          at: nowIso(),
        },
      ],
    }));
  }

  function makeTransaction(intent) {
    const wallet = get().web3Demo.wallet;
    const nonce = get().web3Demo.nextNonce;

    return {
      id: makeId("tx"),
      intentId: intent.id,
      type: intent.type,
      status: "submitted",
      hash: `0x${randomHex(64)}`,
      blockNumber: null,
      confirmations: 0,
      nonce,
      from: wallet.address,
      to: get().contractAddress,
      method: intent.method,
      signature: intent.signature,
      args: {
        numbers: intent.numbers,
        numberOfTickets: intent.tickets,
      },
      valueEth: intent.valueEth,
      gasUsed: null,
      requestId: null,
      winningNumber: null,
      events: [],
      timeline: [
        {
          label: "Wallet approved",
          at: nowIso(),
        },
        {
          label: "Transaction submitted",
          at: nowIso(),
        },
      ],
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
  }

  function addTransaction(transaction) {
    updateTransactions((transactions) => [transaction, ...transactions]);
    updateDemo({
      activeTransactionId: transaction.id,
      nextNonce: get().web3Demo.nextNonce + 1,
    });
  }

  function commitTicketPurchase(transaction) {
    const entry = {
      id: makeId("entry"),
      week: get().web3Demo.lottery.week,
      wallet: transaction.from,
      numbers: transaction.args.numbers,
      tickets: transaction.args.numberOfTickets,
      txHash: transaction.hash,
      createdAt: nowIso(),
    };

    set((state) => ({
      ...state,
      web3Demo: {
        ...state.web3Demo,
        lottery: {
          ...state.web3Demo.lottery,
          status: "entryConfirmed",
          entries: [entry, ...state.web3Demo.lottery.entries],
        },
      },
    }));

    get().pot.addToAmount(transaction.args.numberOfTickets);
  }

  function commitDraw(transaction, winningNumber) {
    const potAmount = Number(get().pot.amount || 0);

    set((state) => ({
      ...state,
      hasLotteryEnded: false,
      web3Demo: {
        ...state.web3Demo,
        lottery: {
          ...state.web3Demo.lottery,
          week: state.web3Demo.lottery.week + 1,
          status: "drawFulfilled",
          lastDraw: {
            week: state.web3Demo.lottery.week,
            winningNumber,
            potEth: potAmount,
            txHash: transaction.hash,
            requestId: transaction.requestId,
            createdAt: nowIso(),
          },
        },
      },
      winner: {
        ...state.winner,
        LastNWeeksWinningNumber: [
          winningNumber,
          ...state.winner.LastNWeeksWinningNumber,
        ].slice(0, 3),
        LastNweeksWinningPot: [
          potAmount,
          ...state.winner.LastNweeksWinningPot,
        ].slice(0, 3),
      },
      pot: {
        ...state.pot,
        amount: 0,
      },
    }));

    get().endTime.readContract();
  }

  async function runTicketTimeline(transaction) {
    await wait(500);
    patchTransaction(transaction.id, { status: "pending" });
    addTimeline(transaction.id, "Hash generated");

    await wait(800);
    addTimeline(transaction.id, "Pending in mempool");

    for (let confirmations = 1; confirmations <= 3; confirmations++) {
      await wait(700);
      patchTransaction(transaction.id, {
        status: "confirming",
        blockNumber: 4823911 + confirmations,
        confirmations,
      });
      addTimeline(transaction.id, `Block confirmation ${confirmations}/3`);
    }

    await wait(500);
    patchTransaction(transaction.id, (current) => ({
      status: "confirmed",
      gasUsed: "85421",
      events: [
        ...current.events,
        {
          name: "TicketEntered",
          args: {
            week: get().web3Demo.lottery.week,
            numbers: transaction.args.numbers,
            tickets: transaction.args.numberOfTickets,
          },
        },
      ],
    }));
    addTimeline(transaction.id, "Contract event: TicketEntered");
    commitTicketPurchase(transaction);

    await wait(400);
    patchTransaction(transaction.id, { status: "receiptReady" });
    addTimeline(transaction.id, "Receipt ready");
  }

  async function runDrawTimeline(transaction) {
    await wait(500);
    const requestId = `0x${randomHex(64)}`;
    patchTransaction(transaction.id, {
      status: "pending",
      requestId,
      events: [
        {
          name: "RequestedRandomNumber",
          args: {
            requestId,
          },
        },
      ],
    });
    addTimeline(transaction.id, "Contract event: RequestedRandomNumber");

    await wait(1000);
    addTimeline(transaction.id, "Waiting for QRNG fulfillment");

    await wait(900);
    const winningNumber = Math.floor(Math.random() * 50) + 1;
    patchTransaction(transaction.id, (current) => ({
      status: "confirmed",
      winningNumber,
      blockNumber: 4825000 + Math.floor(Math.random() * 100),
      confirmations: 3,
      gasUsed: "117904",
      events: [
        ...current.events,
        {
          name: "ReceivedRandomNumber",
          args: {
            requestId,
            winningNumber,
          },
        },
      ],
    }));
    addTimeline(transaction.id, "Contract event: ReceivedRandomNumber");

    await wait(500);
    addTimeline(transaction.id, `Winning number stamped: ${winningNumber}`);
    const current = get().web3Demo.transactions.find(
      (item) => item.id === transaction.id
    );
    commitDraw(current || transaction, winningNumber);

    await wait(400);
    patchTransaction(transaction.id, { status: "receiptReady" });
    addTimeline(transaction.id, "Week reset");
  }

  function openTransactionPrompt(intent) {
    updateDemo({
      activePrompt: {
        type: "transaction",
        intent,
      },
      pendingIntent: null,
      notice: "",
    });
  }

  function hasPendingSimulatorWork() {
    const { lottery, transactions } = get().web3Demo;

    return (
      lottery.status === "entryPending" ||
      lottery.status === "drawPending" ||
      transactions.some((transaction) =>
        PENDING_TRANSACTION_STATUSES.has(transaction.status)
      )
    );
  }

  const storedTransactions = initialTransactions();

  return {
    wallet: initialWallet(),
    activePrompt: null,
    pendingIntent: null,
    activeTransactionId: null,
    transactions: storedTransactions,
    nextNonce: storedTransactions.length + 1,
    notice: "",
    lottery: {
      week: 1,
      status: "open",
      entries: [],
      lastDraw: null,
    },

    openConnectPrompt: () => {
      updateDemo({
        activePrompt: {
          type: "connect",
          intent: null,
        },
        notice: "",
      });
    },

    connectWallet: async () => {
      const sequence = ++connectSequence;
      const prompt = get().web3Demo.activePrompt;
      const promptIntentId = prompt?.intent?.id ?? null;

      updateWallet({
        ...get().web3Demo.wallet,
        status: "connecting",
      });

      await wait(700);
      const activePrompt = get().web3Demo.activePrompt;
      const activePromptIntentId = activePrompt?.intent?.id ?? null;

      if (
        sequence !== connectSequence ||
        !activePrompt ||
        activePrompt.type !== "connect" ||
        activePromptIntentId !== promptIntentId
      ) {
        return;
      }

      const wallet = makeWallet();
      updateWallet(wallet);

      const pendingIntent = get().web3Demo.pendingIntent;
      if (pendingIntent) {
        openTransactionPrompt(pendingIntent);
        return;
      }

      updateDemo({
        activePrompt: null,
        notice: "Demo wallet connected",
      });
    },

    disconnectWallet: () => {
      connectSequence += 1;
      updateWallet(disconnectedWallet());
      updateDemo({
        activePrompt: null,
        pendingIntent: null,
        notice: "Demo wallet disconnected",
      });
    },

    closePrompt: () => {
      connectSequence += 1;
      if (get().web3Demo.wallet.status === "connecting") {
        updateWallet(disconnectedWallet());
      }
      updateDemo({
        activePrompt: null,
        pendingIntent: null,
      });
    },

    startTicketPurchase: () => {
      const intent = ticketIntent(get);

      if (intent.numbers.length !== 5) {
        updateDemo({
          notice: "Select exactly 5 numbers before submitting",
        });
        return;
      }

      if (get().web3Demo.wallet.status !== "connected") {
        updateDemo({
          pendingIntent: intent,
          activePrompt: {
            type: "connect",
            intent,
          },
          notice: "Connect the demo wallet to buy tickets",
        });
        return;
      }

      openTransactionPrompt(intent);
    },

    startDrawWinner: () => {
      if (!get().hasLotteryEnded) {
        updateDemo({
          notice: "The lottery must end before drawing a winner",
        });
        return;
      }

      if (hasPendingSimulatorWork()) {
        updateDemo({
          notice: "Wait for the current contract receipt to finish first",
        });
        return;
      }

      const intent = drawIntent();
      if (get().web3Demo.wallet.status !== "connected") {
        updateDemo({
          pendingIntent: intent,
          activePrompt: {
            type: "connect",
            intent,
          },
          notice: "Connect the demo wallet to draw a winner",
        });
        return;
      }

      openTransactionPrompt(intent);
    },

    approveTransaction: async () => {
      const prompt = get().web3Demo.activePrompt;
      if (!prompt || prompt.type !== "transaction") return;

      const transaction = makeTransaction(prompt.intent);
      updateDemo({
        activePrompt: null,
        notice: "",
        lottery: {
          ...get().web3Demo.lottery,
          status:
            transaction.type === "drawWinner" ? "drawPending" : "entryPending",
        },
      });
      addTransaction(transaction);

      if (transaction.type === "drawWinner") {
        await runDrawTimeline(transaction);
      } else {
        await runTicketTimeline(transaction);
      }
    },

    rejectPrompt: () => {
      const prompt = get().web3Demo.activePrompt;
      connectSequence += 1;

      if (prompt && prompt.type === "transaction") {
        const transaction = {
          ...makeTransaction(prompt.intent),
          status: "rejected",
          hash: null,
          timeline: [
            {
              label: "Wallet rejected",
              at: nowIso(),
            },
          ],
        };
        updateTransactions((transactions) => [transaction, ...transactions]);
        updateDemo({
          activePrompt: null,
          pendingIntent: null,
          activeTransactionId: transaction.id,
          notice: "Transaction rejected in demo wallet",
        });
        return;
      }

      if (get().web3Demo.wallet.status === "connecting") {
        updateWallet(disconnectedWallet());
      }
      updateDemo({
        activePrompt: null,
        pendingIntent: null,
        notice: "Wallet connection cancelled",
      });
    },

    clearNotice: () => {
      updateDemo({ notice: "" });
    },
  };
};
