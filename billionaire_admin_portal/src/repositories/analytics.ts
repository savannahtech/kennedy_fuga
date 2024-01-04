import http from "@utils/api/http";
import { isAxiosError } from "axios";

class Analytics {
  analytics = async (url: string) => {
    {
      try {
        const response = await http.get(url);
        if (response.status === 200 || response.status === 201) {
          return await response.data;
        }
        throw new Error();
      } catch (error) {
        if (isAxiosError(error)) {
          return {
            error: error.response || error.message,
          };
        }
        return {
          error: error,
        };
      }
    }
  };
}

const analyticInstance = new Analytics()
export default analyticInstance;
