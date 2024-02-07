import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAcessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { ACESS_Token } from "../config.js";

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json(["The email already exist"]);
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: passwordHash, username }); // aca e donde se recibe la informacion del front y se guarda en la BD
    const userSaved = await newUser.save();

    const token = await createAcessToken({ id: userSaved._id }); // se crea el token

    res.cookie("token", token); //guarda en un cookies el token
    res.json({
      // se envia la respuesta al cliente osea al front
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    }); // aca devuelve la informacion al frontend guardada en la bd (no es necesaria la password devolverla )
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email }); // estamos verificando que ese usuario si  existe
    if (!userFound) {
      return res.status(400).json(["User not fund"]);
    }

    const IsMatch = await bcrypt.compare(password, userFound.password); // primero   es que envia el cliente  y el otro
    // es el que esta en la base de datos se comparan
    if (!IsMatch) {
      return res.status(400).json(["User or Password Incorrect"]);
    }

    const token = await createAcessToken({ id: userFound._id }); // vas crear un token por ese id ose el usuario

    res.cookie("token", token); //guarda en un cookies el token
    res.json({
      // se envia la respuesta al cliente osea al front
      id: userFound._id, // SE AGREGAN EL USERFOUND POR QUE ES LA INFORMACION DE USUARIO QUE SE BUSCO ARRIBA
      username: userFound.username,
      email: userFound.email,
    }); // aca devuelve la informacion al frontend guardada en la bd (no es necesaria la password devolverla )
  } catch (error) {
    res.status(500).json([error.message]);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.status(200).json({ message: "has cerrado cesion" });
};

export const verify = async (req, res) => {
  // comprobar si el usuario ya trajo su token
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    jwt.verify(token, ACESS_Token, async (err, user) => {
      // aca se verifican los token
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      } else {
        const userFound = await User.findById(user.id);
        if (!userFound) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        return res.json({ // aca le response al usuario con sus datos osea que si esta verificado 
          id: userFound._id,
          username: userFound.username,
          email: userFound.email,
        });
      }
    });
  }
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id); // es una consulta a la BD
  if (!userFound) {
    return res.status(400).json({ message: "user not fund" });
  } else {
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  }
};
