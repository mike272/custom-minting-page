"use client";
import { WalletButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export function ConnectSideBar({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) {
  function CustomWalletButton({
    ready,
    connect,
    connector,
  }: {
    ready: any;
    connect: any;
    connector: any;
  }) {
    const [icon, setIcon] = useState(null);

    useEffect(() => {
      const fetchIconUrl = async () => {
        const url = await connector?.iconUrl();
        setIcon(url);
      };

      fetchIconUrl();
    }, [connector]);
    return (
      <div className="wallet-button">
        <img className="wallet-image" src={icon ?? ""} alt={connector?.name} />
        <button type="button" disabled={!ready} onClick={connect}>
          {connector?.name}
        </button>
      </div>
    );
  }

  const walletsList = ["rainbow", "metamask", "coinbase", "phantom"];

  return (
    <div
      className="sidebar"
      style={{
        display: isOpen ? "flex" : "none",
      }}
    >
      <div className="sidebar-top">
        <div className="sidebar-title">Connect Wallet</div>

        <div className="sidebar-close" onClick={() => setOpen(false)}>
          <IoClose size={24} />
        </div>
      </div>
      {walletsList.map((wallet) => (
        <WalletButton.Custom key={wallet} wallet={wallet}>
          {({
            ready,
            connect,
            connector,
          }: {
            ready: any;
            connect: any;
            connector: any;
          }) => {
            console.log({ connector });
            return (
              <CustomWalletButton
                ready={ready}
                connect={connect}
                connector={connector}
                key={connector?.name}
              />
            );
          }}
        </WalletButton.Custom>
      ))}

      <div className="sidebar-bottom">
        <div>{"Don't have a wallet? "}</div>
        <div className="learn-more-text">Learn more</div>
      </div>
    </div>
  );
}
