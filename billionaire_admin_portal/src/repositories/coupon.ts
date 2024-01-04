import { CouponInput, CouponUpdateInput } from "@ts-types/generated";
import Base from "./base";

class Coupon extends Base<CouponInput, CouponUpdateInput> {}

const couponInstance = new Coupon();
export default couponInstance;
