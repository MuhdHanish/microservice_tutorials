import { Router } from "express";

import {createOrderRouter} from "./create-order";
import {getAllOrdersRouter} from "./get-orders";
import { getOrderByIdRouter } from "./get-order-by-id";
import { deleteOrderRouter } from "./delete-order";

const router = Router();

router.use(createOrderRouter);
router.use(getAllOrdersRouter);
router.use(getOrderByIdRouter);
router.use(deleteOrderRouter);

export { router as orderRouter };