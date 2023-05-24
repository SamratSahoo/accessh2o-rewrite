import { NextApiRequest, NextApiResponse } from "next/types";
import { signUp } from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { getRefreshToken } from "server/utils/Authentication";

export default APIWrapper({
    POST: {
        config: {},
        handler: async (req: NextApiRequest, res: NextApiResponse) => {
            const accessToken = await signUp(req.body);
            const refreshToken = await getRefreshToken(req.body);
            res.setHeader('Set-Cookie',
                `refreshtoken=${refreshToken}; HttpOnly`);

            return accessToken;
        },
    },
});
