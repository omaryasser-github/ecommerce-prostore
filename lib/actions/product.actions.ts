"use server";

import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { prisma } from "@/db/prisma";
// Get latest products

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: {
      createdAt: "desc",
    },
  });
  return convertToPlainObject(data).map((product) => ({
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString(),
  }));
}


// Get single product by slug

export async function getProductBySlug(slug: string) {
const product = await prisma.product.findFirst({
    where: {
      slug,
    },
  });
   if (!product) return null;
  return {
    ...product,
    price: product.price.toString(),   // or Number(product.price)
    rating: product.rating.toString(), // or Number(product.rating)
  };
}
