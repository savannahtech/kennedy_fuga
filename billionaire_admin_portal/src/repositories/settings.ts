import { SettingsInput } from "@ts-types/generated";
import Base from "./base";

class Settings extends Base<SettingsInput, SettingsInput> {}

const settingsInstance = new Settings();
export default settingsInstance;
