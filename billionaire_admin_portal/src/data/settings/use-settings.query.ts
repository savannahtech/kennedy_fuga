// import Settings from "@repositories/settings";
import { useQuery } from "react-query";
import { SettingsOptions, Settings as TSettings } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import settingJson from './settings.json'


export const fetchSettings = async (): Promise<TSettings>  => {
  // const { data } = await Settings.all(API_ENDPOINTS.SETTINGS);
  const data = await new Promise<TSettings>((resolve, reject) => {
    const response = {
      id: '1' ,
      options: settingJson as SettingsOptions
    }
    resolve(response) 
  })
  return data;
};

export const useSettingsQuery = () => {
  return useQuery<TSettings, Error>([API_ENDPOINTS.SETTINGS], () =>
    fetchSettings(),
    {
      staleTime: 60 * 1000
    }
  );
};
