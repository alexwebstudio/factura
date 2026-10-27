import type { Metadata } from "next";
import { CtaForm } from "@/components/home/CtaForm";
import { Documents } from "@/components/home/Documents";
import { FacadeSection } from "@/components/home/FacadeSection";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Materials } from "@/components/home/Materials";
import { Process } from "@/components/home/Process";
import { Projects } from "@/components/home/Projects";
import { Regulations } from "@/components/home/Regulations";
import { TrustBento } from "@/components/home/TrustBento";
import { WhatWeCalculate } from "@/components/home/WhatWeCalculate";
import { pages } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({ title: pages.home.title, description: pages.home.description, path: "/" }),
  title: { absolute: pages.home.title },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <WhatWeCalculate />
      <FacadeSection />
      <TrustBento />
      <Process />
      <Materials />
      <Projects />
      <Regulations />
      <Documents />
      <Faq />
      <CtaForm />
    </>
  );
}
