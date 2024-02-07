export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); // con el metodo parse se ejecuta la validacion  del schema no es necesario de importar
    next(); // esta diciendo que  valide  lo que  llega del front ose aca schema.parse(req.body)
  } catch (error) {
    return res
      .status(400)
      .json(error.errors.map((error) => error.message)); // para que solo muestre el error
  }
};
