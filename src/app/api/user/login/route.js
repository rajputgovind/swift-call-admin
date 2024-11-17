import { NextResponse } from "next/server";
import axios from "axios";
import { toast } from "react-toastify";

export async function POST(req, res) {
  try {
    const { username, password } = await req.json();

    let loginData = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/login?username=${username}&password=${password}&permission=16&expire=3600`
    );

    if (loginData?.data?.JWT) {
    
      return NextResponse.json({
        success: true,
        token: loginData?.data?.JWT,
        message: "Login Successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        token: "",
        message: "Invalid Username or Password",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      token: "",
      message: "Invalid Username or Password",
    });
  }
}
