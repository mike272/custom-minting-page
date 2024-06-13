import React, { useState } from "react";
import { Modal, Button } from "antd";

export function ConfirmationModal({
  cid,
  isOpen,
  setIsOpen,
  title,
  description,
}: {
  cid: string | number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  description: string;
}) {
  return (
    <>
      <Modal
        title="NFT confirmation modal"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        maskClosable={true}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`}
            alt="Description"
            style={{ marginBottom: "20px" }}
          />
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </Modal>
    </>
  );
}
