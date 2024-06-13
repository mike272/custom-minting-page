import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import axios from "axios";

export function ConfirmationModal({
  cid,
  isOpen,
  setIsOpen,
  title,
  description,
}: {
  cid: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  description: string;
}) {
  const [metadata, setMetadata] = useState(null);
  const [image, setImage] = useState(null);
  async function fetchMetadata() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`
      );
      const metadata = JSON.parse(response.data);
      console.log(metadata);
      setMetadata(metadata);
      const ipfsImageUrl = metadata?.image;
      const httpUrl = ipfsImageUrl.replace(
        "ipfs://",
        process.env.NEXT_PUBLIC_GATEWAY_URL + "/ipfs/"
      );
      setImage(httpUrl);
    } catch (error) {
      console.error("Failed to fetch image from IPFS:", error);
    }
  }

  useEffect(() => {
    fetchMetadata();
  }, [cid]);

  return (
    <>
      <Modal
        title="NFT confirmation modal"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        maskClosable={true}
      >
        <div className="flex flex-col items-center h-[400px] w-[600px]">
          <img src={image} alt="Description" className="mb-5 h-50 w-50" />
          <h2>{metadata?.title}</h2>
          <p>{metadata?.description}</p>
        </div>
      </Modal>
    </>
  );
}
