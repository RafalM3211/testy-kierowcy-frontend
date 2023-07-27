import type { Application } from "express";

type AppGet = Application["get"];
type AppGetParams = Parameters<AppGet>;
type GetHandler = AppGetParams[1];
type GetHandlerParams = Parameters<GetHandler>;
type Req = GetHandlerParams[0];
type Res = GetHandlerParams[1];

export type EndpointHandler = (req: Req, res: Res) => void;