import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const parsedBody = JSON.parse(requestBody.body);
    const pinataMetadata = {
      name: parsedBody.title,
    };
    const jsonToSend = {
      pinataContent: JSON.stringify(parsedBody),
      pinataMetadata: JSON.stringify(pinataMetadata),
    };

    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT}`,
      },
      body: JSON.stringify(jsonToSend),
    });
    const resData = await res.json();

    return NextResponse.json({ IpfsHash: resData.IpfsHash }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
