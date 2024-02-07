import {Router} from "express"
import {register,login,logout,profile, verify} from "../controllers/auth.controllers.js"
import { authRequired } from "../middlewares/validateToken.js"
import {validateSchema} from "../middlewares/validator.middlewere.js"
import { loginSchema, registerSchema } from "../schemas/auth.schemas.js"
const router = Router()

router.post("/register",validateSchema(registerSchema),register)
router.post("/login",validateSchema(loginSchema),login) // aca se valida llamando 2  archivos  se mete uno dentro del otro es una validacion de zood
router.post("/logout",logout)
router.get("/profile",authRequired,profile)

router.get("/verify",verify) // esto llega de auth.controllers 
//CADA VEZ QUE USUARIO HACE PETICION O CARGUE LA PAGINA MUESTRE EL TOKEN
export default router