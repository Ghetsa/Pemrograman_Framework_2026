// jobsheet-16/my-app/src/pages/api/register.ts

import { signUp } from '@/utils/db/servicefirebase'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    try {
      await signUp(req.body, (result: { status: string; message: string }) => {
        if (result.status === "success") {
          return res.status(200).json({
            message: result.message
          });
        } else {
          return res.status(400).json({
            message: result.message
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error"
      });
    }
  } else {
    return res.status(405).json({
      message: "Method not allowed"
    });
  }
}