import { connect } from "mongoose";
import { ENVIRONMENT } from "../../enviroment.js";

export const connectDB = async () => {
  try {
    await connect(`${ENVIRONMENT.DB_URL}/${ENVIRONMENT.DB_NAME}`);
    console.log("conexion exitosa");
  } catch (error) {
    console.log(`error al conextarse${error}`);
  }
};