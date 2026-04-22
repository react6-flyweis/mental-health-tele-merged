"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  Activity,
  ChevronDown,
  FilePenLine,
  Globe,
  Lock,
  ShieldIcon,
  Users,
  UserX,
  User,
  UserCheck,
  FileText,
  Server,
  AlertTriangle,
  Copyright,
  ExternalLink,
  Briefcase,
  Scale,
  Gavel,
} from "lucide-react";
import PolicyContactCard from "./PolicyContactCard";

import AcceptanceAndAgreement from "./privacy-sections/AcceptanceAndAgreement";
import SitesNotForChildren from "./privacy-sections/SitesNotForChildren";
import CreatingAnAccount from "./privacy-sections/CreatingAnAccount";
import AccountRegistrationAndSecurity from "./privacy-sections/AccountRegistrationAndSecurity";
import HIPAANotice from "./privacy-sections/HIPAANotice";
import ProhibitedCountries from "./privacy-sections/ProhibitedCountries";
import TherapyServices from "./privacy-sections/TherapyServices";
import IndependenceOfPractitioners from "./privacy-sections/IndependenceOfPractitioners";
import LicensedPractitioners from "./privacy-sections/LicensedPractitioners";
import UserConduct from "./privacy-sections/UserConduct";
import LicenseGrant from "./privacy-sections/LicenseGrant";
import AcceptableUse from "./privacy-sections/AcceptableUse";
import ConsentElectronic from "./privacy-sections/ConsentElectronic";
import SecurityPrivacy from "./privacy-sections/SecurityPrivacy";
import InformationYouProvide from "./privacy-sections/InformationYouProvide";
import SubmissionsOfInformation from "./privacy-sections/SubmissionsOfInformation";
import IntellectualProperty from "./privacy-sections/IntellectualProperty";
import OperationOfTheSite from "./privacy-sections/OperationOfTheSite";
import LimitationOfLiability from "./privacy-sections/LimitationOfLiability";
import NoWarranty from "./privacy-sections/NoWarranty";
import Indemnification from "./privacy-sections/Indemnification";
import LinksToThirdPartyWebsites from "./privacy-sections/LinksToThirdPartyWebsites";
import AffiliateDisclaimer from "./privacy-sections/AffiliateDisclaimer";
import NoAssignment from "./privacy-sections/NoAssignment";
import ApplicableLawEnforcement from "./privacy-sections/ApplicableLawEnforcement";
import ArbitrationSection from "./privacy-sections/ArbitrationSection";
import NoThirdPartyBeneficiaries from "./privacy-sections/NoThirdPartyBeneficiaries";
import AmendmentsAndModifications from "./privacy-sections/AmendmentsAndModifications";

const buildSections = (sections: any[] = []) => {
  const sorted = sections
    ?.slice()
    ?.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const groups: any[] = [];
  let current: any = null;

  sorted.forEach((item) => {
    if (item.heading) {
      if (current) groups.push(current);

      current = {
        id: item.heading.toLowerCase().replace(/\s+/g, "-"),
        title: item.heading,
        content: [],
      };

      if (item.body) current.content.push(item.body);
    } else if (current && item.body) {
      current.content.push(item.body);
    }
  });

  if (current) groups.push(current);

  return groups;
};
export default function PrivacyPolicyContent({ data, loading, error }: any) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sections = buildSections(data?.sections || []);
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    sections.forEach((s: any) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
  console.log({ sections })
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 lg:flex lg:space-x-8">
      <aside className="hidden lg:block lg:w-72 sticky top-24 h-fit">
        <Card className="p-5 gap-0 shadow-sm">
          <h3 className="font-semibold mb-4 text-lg">Table of Contents</h3>
          <ul className="space-y-1">
            {sections.map((s: any) => {
              const SafeIcon = s.Icon || FileText;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={cn(
                      "flex items-center text-sm rounded-xl hover:text-primary px-4 py-2.5 transition-colors",
                      activeId === s.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground border-l-2 border-transparent",
                    )}
                  >
                    <SafeIcon className="size-4 mr-2" />
                    {s.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </Card>
      </aside>
      <div className="flex-1 space-y-6">
        {sections.map((s: any) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <Card className="p-6 md:p-8 gap-0 shadow-md">
              <div className="flex items-center space-x-4 mb-4">
                <div className="shrink-0 size-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-sm">
                  <FileText className="size-5 text-white" />
                </div>

                <h2 className="text-xl font-semibold text-foreground">
                  {s.title}
                </h2>
              </div>

              <div className="space-y-2 text-base text-muted-foreground">
                {s.content.map((c: string, i: number) => (
                  <p key={i}>{c}</p>
                ))}
              </div>
            </Card>
          </section>
        ))}
        <PolicyContactCard />
      </div>
    </div>
  );
}
