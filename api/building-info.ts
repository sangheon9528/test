import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = "http://apis.data.go.kr/1613000/BldRgstHubService/getBrTitleInfo";
  const params = {
    serviceKey: "qwFAz64OALusPCo/SMKxR/sVJqhXTSwyOhT3N3QNGmJVZv9Ehj0i7x2vK/AiHiYoKYGk1OjzoM5Ny5a9BpxbLw==",
    sigunguCd: "11680",
    bjdongCd: "10100",
    _type: "xml",
    numOfRows: "100",
    pageNo: "1",
  };

  try {
    const response = await axios.get(url, {
      params,
      responseType: "text", // XML
    });

    res.setHeader("Content-Type", "application/xml;charset=utf-8");
    res.status(200).send(response.data);
  } catch (error: any) {
    console.error("API 요청 실패:", error?.message);
    res.status(500).send("공공데이터 API 요청 실패");
  }
}
