import { Router } from "express";

import { createTickerRouter } from "./create-ticket";
import { getTicketByIdRouter } from "./get-ticket-by-id";
import { getAllTicketsRouter } from "./get-all-tickets";

const tickerRouter = Router();

tickerRouter.use(createTickerRouter);
tickerRouter.use(getTicketByIdRouter);
tickerRouter.use(getAllTicketsRouter);

export { tickerRouter };