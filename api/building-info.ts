import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { sigunguCd = "11680", bjdongCd = "10100", _type = "xml", numOfRows = "100", pageNo = "1" } = req.query;

  const serviceKey = "qwFAz64OALusPCo/SMKxR/sVJqhXTSwyOhT3N3QNGmJVZv9Ehj0i7x2vK/AiHiYoKYGk1OjzoM5Ny5a9BpxbLw==";

  const apiUrl = "http://apis.data.go.kr/1613000/BldRgstHubService/getBrTitleInfo";

  try {
    const response = await axios.get(apiUrl, {
      params: {
        serviceKey,
        sigunguCd,
        bjdongCd,
        _type,
        numOfRows,
        pageNo
      },
      responseType: "text", // XML일 경우 필요
    });

    res.setHeader("Content-Type", "application/xml;charset=utf-8");
    res.status(200).send(response.data);
  } catch (error: any) {
    console.error("API 요청 실패:", error?.response?.status || error.message);
    res.status(500).send("Internal Server Error");
  }
}
