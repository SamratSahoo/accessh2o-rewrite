// Modified API Wrapper Inspired By Nationals NPP Portal: https://github.com/GTBitsOfGood/national-npp/blob/main/server/utils/APIWrapper.ts
import mongoose, { ObjectId } from "mongoose";
import { NextApiResponse } from "next";
import { getAccessToken, getRefreshToken, getUser, verifyRefreshToken } from "server/utils/Authentication";
import {
    Errors,
    HttpMethod,
    InternalRequest,
    InternalResponseData,
    Role,
    User,
} from "src/utils/types";
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { getOneById } from "server/mongodb/actions/User";

interface RouteConfig {
    requireToken?: boolean;
    roles?: Array<Role>;
    handleResponse?: boolean;
}

interface Route<T> {
    config?: RouteConfig;
    handler: (
        req: InternalRequest,
        res: NextApiResponse<InternalResponseData<T>>
    ) => Promise<T>;
}

function APIWrapper(
    routeHandlers: Partial<Record<HttpMethod, Route<unknown>>>
) {
    return async (req: InternalRequest, res: NextApiResponse) => {
        const method = req.method;
        const route = routeHandlers[method as HttpMethod];

        if (!method || !route) {
            const errorMessage = method
                ? `Request method ${method} is invalid.`
                : "Missing request method.";

            return res.status(400).json({
                success: false,
                message: errorMessage,
            });
        }

        const { config, handler } = route;

        try {
            // token settings
            let tokenSettings = {}
            // Handle user access token + roles restrictions
            if (config?.requireToken) {
                let user: null | User = null;
                try {
                    // Try to get user
                    user = getUser(req.headers.accesstoken as string);
                } catch (err) {
                    try {
                        if (!(err instanceof TokenExpiredError)) {
                            throw new Error(Errors.token.IS_INVALID)
                        }
                        // Verify the refresh token
                        const userId = verifyRefreshToken(req.cookies.refreshtoken as string)
                        // get user from refresh token
                        user = await getOneById(userId?._id as unknown as ObjectId)
                        if (!user) {
                            return res.status(403).json({
                                success: false,
                                message: Errors.user.DOESNT_EXIST,
                            });
                        }
                        tokenSettings = {
                            accessToken: getAccessToken(user as User),
                        }
                        res.setHeader('Set-Cookie',
                            `refreshtoken=${getRefreshToken(user as User)}; HttpOnly`);
                    } catch {
                        return res.status(403).json({
                            success: false,
                            message: Errors.token.IS_INVALID,
                        });
                    }
                }

                if (config.roles) {
                    if (
                        config.roles.length !== 0 &&
                        !config.roles.some((role) => user?.roles?.includes(role))
                    ) {
                        return res.status(403).json({
                            success: false,
                            message: Errors.user.MISSING_PERMISSIONS,
                        });
                    }
                }

            }
            const data = await handler(req, res);

            if (config?.handleResponse) {
                return;
            }

            return res.status(200).json({ success: true, payload: data, ...tokenSettings });
        } catch (e) {
            if (e instanceof mongoose.Error) {
                return res.status(500).json({
                    success: false,
                    message: "An Internal Server error occurred.",
                });
            }

            const error = e as Error;
            return res.status(400).json({ success: false, message: error.message });
        }
    };
}

export default APIWrapper;
