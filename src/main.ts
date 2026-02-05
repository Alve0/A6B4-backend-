import { app } from "./app.js";
import { prisma } from "./lib/prisma.js";

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
