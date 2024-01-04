import { CreateProduct, UpdateProduct } from "@ts-types/generated";
import Base from "./base";

class Product extends Base<CreateProduct, UpdateProduct> {
  popularProducts = (url: string) => {
    return this.http(url, "get");
  };
}
const productInstance = new Product();
export default productInstance;
