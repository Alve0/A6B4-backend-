import { Request } from "express";
import { Provider } from "../../generated/prisma/client";

import { prisma } from "../../lib/prisma";

async function createProvider(data: Provider) {
  const result = await prisma.provider.create({ data });
  return result;
}

export const providerService = { createProvider };
