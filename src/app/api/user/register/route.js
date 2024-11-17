import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const {
      country_id,
      state_id,
      city_id,
      user_name,
      user_pass,
      userMobno,
      userEmail,
    } = await request.json();

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      {
        country_id: country_id,
        state_id: state_id,
        city_id: city_id,
        user_name: user_name,
        user_pass: user_pass,
        userEmail: userEmail,
        userMobno: userMobno,
      }
    );

    if (data?.success === true && data?.action === "add") {
      return NextResponse.json({
        status: 200,
        success: true,
        message: data?.user_db,
      });
    } else if (data?.failureMessage) {
      return NextResponse.json({
        status: 200,
        success: false,
        message: data?.failureMessage,
      });
    } else if (data?.success === false && data?.validation) {
      return NextResponse.json({
        status: 200,
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (err) {
    console.log("error Response", err);
    return NextResponse.json({
      message: "",
    });
  }
}


