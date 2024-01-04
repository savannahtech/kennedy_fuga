import Base from "./base";

import { CreateTypeInput } from "@ts-types/generated";

class Type extends Base<CreateTypeInput, CreateTypeInput> {}

const typeInstance = new Type()
export default typeInstance;
