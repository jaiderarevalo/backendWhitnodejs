import app from "./app.js";
import ConnectBd from "./bd.js"
import { PORT } from "./config.js";
ConnectBd()
//const port = 6200
app.listen(PORT,()=>{console.log(`esta rodando el port ${PORT}`);})
