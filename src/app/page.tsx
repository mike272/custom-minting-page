"use client";
import { ConnectSideBar } from "@/lib/components/connect-side-bar";
import { Header } from "@/lib/components/header";
import Head from "next/head";
import { useState } from "react";
import { useAccount } from "wagmi";
import { MdOutlineFileUpload } from "react-icons/md";
import { writeContract } from "wagmi/actions";
import { wagmiConfig } from "@/lib/providers/providers";
import axios from "axios";
import FormData from "form-data";
import { ConfirmationModal } from "@/lib/components/confirmation-modal";
import { message } from "antd";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File>();
  const { address, isConnected } = useAccount();
  const [isSideBarOpen, setIsSideBarOpen] = useState(!isConnected);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  let filePinataUrl = "";
  const ABI_json_url =
    "https://github.com/LinumLabs/web3-task-abi/blob/dev/Musharka721.json";

  const [uploading, setUploading] = useState(false);
  const [cid, setCid] = useState("");
  const uploadFile = async (fileToUpload) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", fileToUpload);
      const metadata = { title, description };
      formData.append("metadata", JSON.stringify(metadata));
      formData.append("title", title);
      formData.append("description", description);

      const resData = await axios.post("/api/files", formData, {
        maxBodyLength: Infinity,
      });

      setCid(resData.data.IpfsHash);
      messageApi.open({
        type: "success",
        content: "Your file has been uploaded, you can mint a token now!",
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
        const abiResponse = await fetch(ABI_json_url);
        const abi = await abiResponse.json();
        const response = await writeContract(wagmiConfig, {
          abi,
          address: process.env.NEXT_PUBLIC_NFT_ADDRESS as `0x${string}`,
          functionName: "mint",
          args: [title, description, filePinataUrl],
          chainId: 11155111,
          chain: undefined,
          account: address,
        });
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
        cid={cid}
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
