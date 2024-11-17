import { NextResponse } from "next/server";
import axios from "axios";


export async function GET(request) {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/list/cities`
    );

    return NextResponse.json({ success: true, message: data });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Error" });
  }
}
