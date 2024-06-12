// pages/index.js
"use client";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleMintWithoutListing = () => {
    // Handle minting without listing
  };

  const handleMintAndListImmediately = () => {
    // Handle minting and listing immediately
  };

  return (
    <div className="main-page">
      <Head>
        <title>NFT Sea</title>
        <meta name="description" content="Mint New NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h1 className="title">Mint New NFT</h1>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sem
          tortor quis amet scelerisque vivamus egestas.
        </p>

        <div className="form">
          <input type="file" accept="image/*" className="file-input" />

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
              className="button primary"
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
