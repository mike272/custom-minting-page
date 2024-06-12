// pages/index.js
"use client";
import { ConnectSideBar } from "@/lib/components/connect-side-bar";
import { Header } from "@/lib/components/header";
import Head from "next/head";
import { useState } from "react";
import { useAccount } from "wagmi";
import { MdOutlineFileUpload } from "react-icons/md";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { address, isConnected } = useAccount();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const handleMintWithoutListing = () => {
    if (isConnected) {
    } else {
      setIsSideBarOpen(true);
    }
  };

  const handleMintAndListImmediately = () => {
    if (isConnected) {
    } else {
      setIsSideBarOpen(true);
    }
  };

  return (
    <div className="main-page">
      <Header onConnectClick={setIsSideBarOpen} />
      <ConnectSideBar isOpen={isSideBarOpen} setOpen={setIsSideBarOpen} />
      <Head>
        <title>NFT Sea</title>
        <meta name="description" content="Mint New NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <div className="card">
          <h1 className="title-text">MINT NEW NFT</h1>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sem
            tortor quis amet scelerisque vivamus egestas.
          </p>
        </div>

        <div className="form">
          {/* <input type="file" accept="image/*" className="file-input" /> */}
          <div
            onClick={() => document?.getElementById("file-input")?.click()}
            className="file-upload-container"
          >
            <input
              type="file"
              accept="image/*"
              id="file-input"
              className="file-input"
            />
            <div className="row">
              <MdOutlineFileUpload className="upload-icon" />
              <label htmlFor="file-input" className="file-input-label">
                Upload File
              </label>
            </div>
            <div className="small-text">Format supported</div>
          </div>
          <input
            type="text"
            placeholder="NFT Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea"
          ></textarea>

          <div className="buttons">
            <button onClick={handleMintWithoutListing} className="button">
              Mint without listing
            </button>
            <button
              onClick={handleMintAndListImmediately}
              className="button button-gradient"
            >
              Mint and list immediately
            </button>
          </div>
        </div>
      </main>

      <footer className="footer">
        <a href="#" className="explore">
          Explore Marketplace
        </a>
        <p className="copyright">NFT Sea 2022 & All rights reserved</p>
      </footer>
    </div>
  );
}
