"use client";
import { useState } from "react";
import FAQHero from "@/modules/main/components/FAQHero";
import FAQCategories from "@/modules/main/components/FAQCategories";

export default function page() {
  const [search, setSearch] = useState("");
  return (
    <>
      <FAQHero search={search} setSearch={setSearch} />
      <FAQCategories search={search} />
    </>
  );
}
