import { Router } from "express";

import { createTickerRouter } from "./create-ticket";
import { getTicketByIdRouter } from "./get-ticket-by-id";

const tickerRouter = Router();

tickerRouter.use(createTickerRouter);
tickerRouter.use(getTicketByIdRouter);

export { tickerRouter };