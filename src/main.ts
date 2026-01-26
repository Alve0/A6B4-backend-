import { app } from "./app";
import { prisma } from "./lib/prisma";

async function server() {
  try {
    await prisma
      .$connect()
      .then(() => console.log("Connected to the database successfully"));

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
}
server();
