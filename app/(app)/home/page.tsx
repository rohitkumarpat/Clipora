"use server"
import { check_user } from "@/lib/check";
import HomeClient from "../home1/page";


export default async function HomePage() {
  const user = await check_user();

  if (!user) return null;
  
  return < HomeClient  />;
}