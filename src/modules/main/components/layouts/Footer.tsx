"use client";
import { Link } from "react-router";
import logo from "@/assets/medical-health-tele-logo.png";
import { useFetch } from "@/hooks/useFetch";
import { publicPageApi } from "@/api/publicpage.api";

export default function Footer() {
  const {
    data: { footer },
    loading: footerLoading,
    error: footerError,
  } = useFetch(publicPageApi.getDashboardAPI) as any;

  return (
    <footer className="bg-[#346079] text-slate-100">
      <div className="container mx-auto px-4 md:px-6 pt-16 pb-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center">
              <img
                src={logo}
                alt=""
                className="h-10 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>

            <ul className="mt-8 space-y-4 text-slate-200 text-sm">
              {footer?.quickLinks?.map((item: any) => (
                <li key={item.label}>
                  <Link to={item.url} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {footer?.columns?.map((col: any) => (
            <div key={col.heading}>
              <h4 className="text-white font-semibold mb-4">{col.heading}</h4>
              <ul className="space-y-4 text-slate-200 text-sm">
                {col.links?.map((link: any) => (
                  <li key={link.label}>
                    <Link to={link.url} className="hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-10 border-t border-white/20">
          <p className="text-center text-xs sm:text-sm text-slate-100/85 leading-relaxed max-w-5xl mx-auto">
            {footer?.disclaimerText}
          </p>
        </div>

        <div className="mt-6 text-center text-xs text-slate-100/70">
          {footer?.copyrightText}
        </div>
      </div>
    </footer>
  );
}
