const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3500; // Puedes cambiar el puerto si es necesario

app.use(bodyParser.json());

// Configurar opciones para CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Cambia esta URL a la URL de tu frontend
    methods: 'GET, POST', // Define los métodos HTTP permitidos
    optionsSuccessStatus: 204 // Responder sin contenido para las solicitudes OPTIONS
};

// Habilitar CORS con las opciones configuradas
app.use(cors(corsOptions));

// Configura el transporte para el envío de correos
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'alex95mf@gmail.com',
        pass: 'whepaidtegocsyrr'
    }
});

// Ruta para manejar el envío de correos
app.post('/enviar-correo', (req, res) => {
    const { nombre, empresa, email, telefono, mensaje } = req.body;

    const mailOptions = {
        from: email,
        to: 'alex95mf@gmail.com',
        subject: 'Mensaje desde Portafolio',
        html: `
      <p>Nombre: ${nombre}</p>
      <p>Empresa: ${empresa}</p>
      <p>Email: ${email}</p>
      <p>Teléfono: ${telefono}</p>
      <p>Mensaje: ${mensaje}</p>
    `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            // res.status(500).send(error);
            res.status(500).send('Error al enviar el correo');
        } else {
            console.log('Correo enviado:', info.response);
            res.send('Correo enviado con éxito');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
