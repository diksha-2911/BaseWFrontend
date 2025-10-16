"use client";
import { useState, useEffect } from "react";
import { useGreeter } from "@/src/hooks/useGreeter";
import styles from "./page.module.css";
import { Wallet } from "@coinbase/onchainkit/wallet";
import { useAccount, useBalance, useSignMessage } from "wagmi";

export default function Home() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({ address });
  const {
    signMessage,
    data: signature,
    isPending: isSignPending,
  } = useSignMessage();

  const isCorrectNetwork = chain?.id === 84532;
  const [message, setMessage] = useState("Hello From Base Sepolia!");
  const [newGreeting, setNewGreeting] = useState("");
  const {
    greeting,
    refetchGreeting,
    hash,
    readError,
    setGreeting,
    isWritePending,
    writeError,
    isConfirming,
    isConfirmed,
    confirmError,
  } = useGreeter(); //from smart contract

  const currentGreeting = (greeting as string) || "";

  useEffect(() => {
    if (isConfirmed) {
      refetchGreeting();
      setNewGreeting("");
    }
  });

  const handleSetGreeting = () => {
    if (newGreeting.trim()) {
      setGreeting(newGreeting);
    }
  };

  const handleSignMessage = () => {
    signMessage({ message });
  };

  return (
    <div className={styles.container}>
      <header className={styles.headerWrapper}>
        <Wallet />
      </header>

      {/* <div className={styles.content}>
        <Image
          priority
          src="/sphere.svg"
          alt="Sphere"
          width={200}
          height={200}
        />
        <h1 className={styles.title}>OnchainKit</h1>

        <p>
          Get started by editing <code>app/page.tsx</code>
        </p>

        <h2 className={styles.componentsTitle}>Explore Components</h2>

        <ul className={styles.components}>
          {[
            {
              name: "Transaction",
              url: "https://docs.base.org/onchainkit/transaction/transaction",
            },
            {
              name: "Swap",
              url: "https://docs.base.org/onchainkit/swap/swap",
            },
            {
              name: "Checkout",
              url: "https://docs.base.org/onchainkit/checkout/checkout",
            },
            {
              name: "Wallet",
              url: "https://docs.base.org/onchainkit/wallet/wallet",
            },
            {
              name: "Identity",
              url: "https://docs.base.org/onchainkit/identity/identity",
            },
          ].map((component) => (
            <li key={component.name}>
              <a target="_blank" rel="noreferrer" href={component.url}>
                {component.name}
              </a>
            </li>
          ))}
        </ul>
      </div> */}

      <div className={styles.content}>
        <h1 className={styles.title}>Base Onchain Project</h1>
        <div>
          {isConnected && address && (
            <div className={styles.section}>
              {!isCorrectNetwork && (
                <div className={styles.errorMessage}>
                  <p>Switch to Base Sepolia Network in your wallet!</p>
                  <p className={styles.networkInfo}>
                    Current : {chain?.name || "Unknown"} | required Base Sepolia
                    Network!{" "}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.card}>
          <p className={styles.label}>Connected Address:</p>
          <p className={styles.address}>{address}</p>

          {balance && (
            <div className={styles.balanceSection}>
              <p className={styles.label}>ETH Balance:</p>
              <p className={styles.balance}>
                {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
              </p>
            </div>
          )}
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Sign a Message(Gasless)</h2>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.input}
            placeholder="Enter message to sign"
          />
          <button
            onClick={handleSignMessage}
            disabled={isSignPending}
            className={styles.button}
          >
            {isSignPending ? "Sigining.." : "Sign Message"}
          </button>

          {signature && (
            <div className={styles.signatureSection}>
              <p className={styles.label}>Signature:</p>
              <p className={styles.signature}>{signature}</p>
            </div>
          )}
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Greeter Contract: </h2>
          <div className={styles.greetingMessage}>
            <p className={styles.label}>Current Greeting:</p>
            <p className={styles.currentGreeting}>
              {currentGreeting || "Loading.."}
            </p>
          </div>

          <div className={styles.updateSection}>
            <p className={styles.label}>Update Greeting:</p>
            <input
              type="text"
              value={newGreeting}
              onChange={(e) => setNewGreeting(e.target.value)}
              className={styles.input}
              placeholder="Enter new greeting"
            />
            <button
              onClick={handleSetGreeting}
              disabled={isWritePending || isConfirming}
              className={styles.button}
            >
              {isWritePending
                ? "Sending Transaction.."
                : isConfirming
                  ? "Confirming"
                  : "Update Greeting"}
            </button>
          </div>

          {hash && (
            <div className={styles.transactionSection}>
              <p className={styles.label}>Transaction Hash: </p>
              <a
                href={`https://sepolia.basescan.org/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.txLink}
              >
                {hash}
              </a>
            </div>
          )}

          {isConfirmed && (
            <div className={styles.successMessage}>
              <p>Greeting updated Successfully!</p>
            </div>
          )}

          {(writeError || confirmError) && (
            <div className={styles.errorMessage}>
              <p>Error: {writeError?.message || confirmError?.message}</p>
            </div>
          )}
          {readError && isWritePending && (
            <div className={styles.errorMessage}>
              <p>Failed to Read Contract</p>
            </div>
          )}

          {!isConnected && (
            <div className={styles.connectPrompt}>
              <p>Connect your wallet to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
