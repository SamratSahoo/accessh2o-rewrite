import { NextApiRequest, NextApiResponse } from "next/types";
import { login } from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { getRefreshToken } from "server/utils/Authentication";

export default APIWrapper({
    POST: {
        config: {},
        handler: async (req: NextApiRequest, res: NextApiResponse) => {
            const accessToken = await login(req.body)
            const refreshToken = getRefreshToken(req.body)
            res.setHeader('Set-Cookie',
                `refreshtoken=${refreshToken}; HttpOnly`);
            return accessToken;
        },
    },
});
