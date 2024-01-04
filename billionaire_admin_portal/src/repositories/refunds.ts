import Base from "./base";

// import { CreateRefundInput, UpdateRefundInput } from "@ts-types/generated";
interface CreateRefundInput {}
interface UpdateRefundInput {}

class Refunds extends Base<CreateRefundInput, UpdateRefundInput> {}

const refundsInstance = new Refunds();
export default refundsInstance
