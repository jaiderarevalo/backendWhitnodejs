import jwt from "jsonwebtoken";
import { ACESS_Token } from "../config.js";

export const createAcessToken = (payload) => {
  return new Promise((resolve, reject) => {
    // RESOLVE es si sale algo bien y REJECT si esta mal el promise es de node y es global
    jwt.sign(
      payload,
      ACESS_Token,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
