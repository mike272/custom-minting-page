import { RiWallet3Line } from "react-icons/ri";

export function Header({
  onConnectClick,
}: {
  onConnectClick: (open: boolean) => void;
}) {
  return (
    <div className="header-container">
      <div className="row">
        <div className="large-header-text">NFT</div>
        <div className="gradient-text">SEA</div>
      </div>
      <div className="row">
        <div className="white-text">Explore Marketplace</div>
        <RiWallet3Line
          className="wallet-icon"
          onClick={() => onConnectClick(true)}
          size={24}
        />
      </div>
    </div>
  );
}
