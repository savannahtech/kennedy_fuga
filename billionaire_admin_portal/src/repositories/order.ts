import {
	CheckoutVerificationInput,
	CreateOrder,
	UpdateOrder,
} from "@ts-types/generated";
import Base from "./base";

class Order extends Base<CreateOrder, UpdateOrder> {
	verify = async (url: string, variables: CheckoutVerificationInput) => {
		return this.http<CheckoutVerificationInput>(url, "post", variables);
	};
}

const orderInstance = new Order();
export default orderInstance;