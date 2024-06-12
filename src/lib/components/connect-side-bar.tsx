import { WalletButton } from "@rainbow-me/rainbowkit";
import { IoClose } from "react-icons/io5";

export function ConnectSideBar({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <div
      className="sidebar"
      style={{
        display: isOpen ? "block" : "none",
      }}
    >
      <div className="sidebar-top">
        <div className="sidebar-title">Connect Wallet</div>

        <div className="sidebar-close" onClick={() => setOpen(false)}>
          <IoClose size={24} />
        </div>
      </div>
      <WalletButton wallet="rainbow" />
      <WalletButton wallet="metamask" />
      <WalletButton wallet="coinbase" />
      <div className="sidebar-bottom">
        <div>{"Don't have a wallet? "}</div>
        <div className="learn-more-text">Learn more</div>
      </div>
    </div>
  );
}
