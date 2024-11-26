import { Router } from "express";

import { createTickerRouter } from "./create-ticket";
import { getTicketByIdRouter } from "./get-ticket-by-id";
import { getAllTicketsRouter } from "./get-all-tickets";
import { updateTicketRouter } from "./update-ticket";

const tickerRouter = Router();

tickerRouter.use(createTickerRouter);
tickerRouter.use(updateTicketRouter);
tickerRouter.use(getTicketByIdRouter);
tickerRouter.use(getAllTicketsRouter);

export { tickerRouter };