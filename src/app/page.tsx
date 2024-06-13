"use client";
import { ConnectSideBar } from "@/lib/components/connect-side-bar";
import { Header } from "@/lib/components/header";
import Head from "next/head";
import { useState } from "react";
import { useAccount } from "wagmi";
import { MdOutlineFileUpload } from "react-icons/md";
import { useWriteContract } from "wagmi";
import { wagmiConfig } from "@/lib/providers/providers";
import axios from "axios";
import FormData from "form-data";
import { ConfirmationModal } from "@/lib/components/confirmation-modal";
import { message } from "antd";
import abiJson from "@/app/assets/Musharka721.json";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File>();
  const { address, isConnected } = useAccount();
  const [isSideBarOpen, setIsSideBarOpen] = useState(!isConnected);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { writeContract } = useWriteContract();

  let filePinataUrl = "";

  const [uploading, setUploading] = useState(false);
  const [cid, setCid] = useState("");
  const [metadataCid, setMetadataCid] = useState("");

  const uploadMetadata = async (fileCid) => {
    try {
      setUploading(true);
      const metadata = {
        title,
        description,
        image: "ipfs://" + fileCid,
        name: title,
      };

      const res = await axios.post("/api/json", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metadata),
      });

      setMetadataCid(res.data.IpfsHash);
      messageApi.open({
        type: "success",
        content:
          "Your file has been connected to your metadata, you can mint it now!",
      });
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      messageApi.open({
        type: "error",
        content: "Error uploading metadata, please try again!",
      });
    }
  };

  const uploadFile = async (fileToUpload) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", fileToUpload);

      const res = await axios.post("/api/files", formData, {
        maxBodyLength: Infinity,
      });

      setCid(res.data.IpfsHash);
      uploadMetadata(res.data.IpfsHash);

      messageApi.open({
        content:
          "Your image has been uploaded, plase wait while we link it to your metadata",
      });

      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      messageApi.open({
        type: "error",
        content: "Error uploading file, please try again!",
      });
    }
  };

  const handleMintWithoutListing = async () => {
    if (isConnected) {
      try {
        const response = await writeContract({
          abi: abiJson["abi"],
          address: process.env.NEXT_PUBLIC_NFT_ADDRESS as `0x${string}`,
          functionName: "mint",
          args: [address, "ipfs://" + metadataCid],
          chainId: 11155111,
          chain: undefined,
          account: address,
        });
        console.log({ response });
        setIsModalOpen(true);
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsSideBarOpen(true);
    }
  };

  const handleMintAndListImmediately = () => {
    handleMintWithoutListing();
  };

  return (
    <div className="main-page">
      {contextHolder}
      <Header onConnectClick={setIsSideBarOpen} />
      <ConnectSideBar isOpen={isSideBarOpen} setOpen={setIsSideBarOpen} />
      <ConfirmationModal
        cid={metadataCid}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title={title}
        description={description}
      />
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
          <div
            onClick={(e) => {
              e.stopPropagation();
              document?.getElementById("file-input")?.click();
            }}
            className="file-upload-container"
          >
            <input
              type="file"
              accept="image/*"
              id="file-input"
              className="file-input"
              onChange={(e) => {
                const newFile = e?.target?.files?.[0];
                if (newFile) {
                  setFile(newFile);
                  uploadFile(newFile);
                }
              }}
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
        <p className="copyright">NFT Sea 2024 & All rights reserved</p>
      </footer>
    </div>
  );
}
