import Axios from "axios";
import { waitFor } from "./wait-for";

const deps = [
  {
    name: "API Server",
    condition: async () => {
      try {
        await Axios.get(`http://localhost:${process.env.PORT || 7070}/Health`);
        return true;
      } catch (error) {
        return false;
      }
    },
  },
];

waitFor({ deps });
