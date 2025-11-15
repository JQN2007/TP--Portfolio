module.exports = {
   login: (req, res) => res.render('auth/login', { title: 'Login' }),
  register: (req, res) => res.render('auth/register', { title: 'Registro' }),

  loginProcess: (req, res) => {
    const { email, password } = req.body;
    // Acá iría la validación del usuario
    res.send(`Usuario logueado con email: ${email}`);
  },

  registerProcess: (req, res) => {
    const { name, email, password } = req.body;
    // Acá guardarías el usuario en la base de datos
    res.send(`Usuario registrado: ${name} - ${email}`);
  }
};