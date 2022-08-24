import axios from "axios";

const emagConsumer = async (url: string) => {
  return axios
    .get("http://localhost:8005/scrape/emag", {
      params: {
        url: url,
      },
    })
    .then((res) => res.data)
    .catch((_err) => undefined);
};

export default emagConsumer;
