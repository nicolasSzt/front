import { connectDB } from "./config/db.config.js";
import express from "express";
import { ENVIRONMENT } from "../enviroment.js";
import productsRouter from "./routes/product.routes.js";
import transporter from "./config/mail.config.js";
import userRouter from "./routes/users.routes.js";
connectDB();

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Hola soy una respuesta de express</h1>");
});

// const products = [
//   {
//     title: "Tv samsung",
//     price: 4000,
//     id: 1,
//   },
//   {
//     title: "Tv LG",
//     price: 5000,
//     id: 2,
//   },
//   {
//     title: "Tv Noblex",
//     price: 6000,
//     id: 3,
//   },
// ];

// app.get("/productos", (request, response) => {
//   let max_price = request.query.max_price;
//   let min_price = request.query.min_price;
//   const filter_list = products.filter((product) => product.price <= max_price);
//   response.send(filter_list);
// });

export const sendVerificationEmail = async ({ email, name, redirectUrl }) => {
  const result = await transporter.sendMail({
    from: ENVIRONMENT.GMAIL_USERNAME,
    to: email,
    subject: "Verifica tu correo electronico",
    html: `
            <h1>Bienvenido ${name}</h1>
            <p>
                Necesitamos que des click al siguiente link para verificar que esta es tu cuenta, en caso de no reconocer este registro desestima el mail.
            </p>
            <a href="${redirectUrl}">Verificar cuenta</a>
            <span> Tienes 7 dias para dar click al link<span/>
            `,
  });
  console.log("Mail enviado:", result);
};

app.use("/api/products", productsRouter);
app.use("/api/users", userRouter);

app.listen(ENVIRONMENT.PORT, () => {
  console.log(
    `la aplicacion se esta escuchando en http://localhost:${ENVIRONMENT.PORT}`
  );
});
