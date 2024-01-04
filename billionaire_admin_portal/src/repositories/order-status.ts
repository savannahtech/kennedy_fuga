import { OrderStatusInput, OrderStatusUpdateInput } from "@ts-types/generated";
import Base from "./base";

class OrderStatus extends Base<OrderStatusInput, OrderStatusUpdateInput> {}

const orderStatusInstance = new OrderStatus();
export default orderStatusInstance;
