import axios from "axios";
import { baseURL, publicKeyParam } from "./constants";

export interface ComicsData {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  characters?: {
    returned: number;
    items: [{ name: string; role: string }];
  };
  modified: string;
  dates: [{ date: string; type: string }];
  images: [
    {
      extension: string;
      path: string;
    }
  ];
  modalActive: boolean;
}

interface ComicsRes {
  data: {
    count: number;
    limit: number;
    offset: number;
    results: ComicsData[];
    total: number;
  };
}

export const getCharsByComicUtil = async (selections: string[]) => {
  try {
    let charParam = "characters";
    if (selections.length === 0) {
      return null;
    } else if (selections.length > 1) {
      charParam = "sharedAppearances";
    }

    const res = await axios.get<ComicsRes>(
      `${baseURL}/v1/public/comics?${charParam}=${selections.toString()}&limit=9&${publicKeyParam}`
    );
    return res.data.data.results;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const searchComicsUtil = async (
  input: string,
  selection: string,
  asc: boolean
) => {
  try {
    const res = await axios.get<ComicsRes>(
      `${baseURL}/v1/public/comics?titleStartsWith=${input}&orderBy=${
        !asc ? `-` : ``
      }${selection}&limit=6&${publicKeyParam}`
    );
    return res.data.data.results;
  } catch (err) {
    return null;
  }
};
