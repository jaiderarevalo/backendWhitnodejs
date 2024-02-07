import mongoose from "mongoose";
import * as dotenv from "dotenv"
import { URL_BD } from "./config.js";

const ConnectBd = async () => {
    dotenv.config()
  try {
    await mongoose.connect(URL_BD);
    console.log("esta conectado a mongoDB");
  } catch (error) {
    console.log(`error en BD ${error}`);
  }
};
export default ConnectBd;
