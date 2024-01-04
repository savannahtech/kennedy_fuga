import Base from "./base";

import {
  AttributeValueCreateInput,
  AttributeValueUpdateInput,
} from "@ts-types/generated";

class AttributeValue extends Base<
  AttributeValueCreateInput,
  AttributeValueUpdateInput
> {}

const attributeValueInstance = new AttributeValue();
export default attributeValueInstance;
