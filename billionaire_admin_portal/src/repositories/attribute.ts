import Base from "./base";

import { AttributeInput } from "@ts-types/generated";

class Attribute extends Base<AttributeInput, AttributeInput> {}

const attributeInstance = new Attribute();
export default attributeInstance;
