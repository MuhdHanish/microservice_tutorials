import { Router } from "express";

import { createTickerRouter } from "./create-ticket";

const tickerRouter = Router();

tickerRouter.use(createTickerRouter);

export { tickerRouter };