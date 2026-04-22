"use client";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import BookAppointmentDialog from "@/modules/main/components/dashboard/BookAppointmentDialog";
import { useEffect, useMemo, useState } from "react";
import { dashboardApi } from "@/api/dashboard.service";
import { RatingStars } from "@/modules/main/components/rating";
import { cn } from "@/lib/utils";

const SkeletonCard = () => (
  <Card className="p-4 animate-pulse">
    <div className="flex flex-col items-center text-center">
      <div className="size-20 rounded-full bg-gray-200" />

      <div className="mt-4 space-y-2 w-full">
        <div className="h-4 bg-gray-200 w-40 mx-auto rounded" />
        <div className="h-3 bg-gray-200 w-32 mx-auto rounded" />
      </div>

      <div className="mt-4 h-4 w-20 bg-gray-200 rounded" />

      <div className="mt-6 w-full flex justify-between">
        <div className="space-y-2">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>

        <div className="space-y-2">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="mt-6 w-full flex gap-2">
        <div className="h-10 w-full bg-gray-200 rounded" />
        <div className="h-10 w-full bg-gray-200 rounded" />
      </div>
    </div>
  </Card>
);
export default function page() {
  const [role, setRole] = useState("");
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [rating, setRating] = useState("any");
  const [priceRange, setPriceRange] = useState("any");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [sessionTab, setSessionTab] = useState<
    "All Providers" | "My Providers"
  >("All Providers");
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [total, setTotal] = useState(0);
  const handleMyProviders = async () => {
    if (!role) return;

    try {
      setLoading(true);
      setError(null);

      let response: any;

      if (sessionTab === "My Providers") {
        response = await dashboardApi.getMyProviders(role, { page, limit });
      } else {
        response = await dashboardApi.getProviders(role, { page, limit });
      }

      const data = response?.data || {};
      console.log(response);
      setProviders(data?.providers || []);
      setTotal(response?.total || 0);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch providers");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleMyProviders();
  }, [role, sessionTab, page]);
  const totalPages = Math.ceil(total / limit);

  const pagination = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    pages.push(1);

    if (page > 4) {
      pages.push("...");
    }

    const start = Math.max(2, page - 2);
    const end = Math.min(totalPages - 1, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  }, [totalPages, page]);
  const handleClick = (page: number) => {
    setPage(page);
  };
  console.log("page", page, totalPages);
  useEffect(() => {
    setRole(localStorage.getItem("role") || "");
  }, []);

  const filteredProviders = providers.filter((p: any) => {
    const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
    const spec = p.specialty?.toLowerCase() || "";
    const ratingValue = Number(p.rating || 0);
    const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      spec.includes(search.toLowerCase());

    const matchesSpecialty = specialty === "all" || spec.includes(specialty);

    const matchesRating = rating === "any" || ratingValue >= Number(rating);
    const matchesPriceRange = (() => {
      if (priceRange === "any" || priceRange === "all") return true;

      const fee = Number(p.sessionFee ?? 0);

      if (priceRange === "0-100") {
        return fee >= 0 && fee <= 100;
      }

      if (priceRange === "100-150") {
        return fee > 100 && fee <= 150;
      }

      if (priceRange === "150+") {
        return fee > 150;
      }

      return true;
    })();

    return (
      matchesSearch && matchesSpecialty && matchesRating && matchesPriceRange
    );
  });
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium">Find Providers</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Connect with qualified healthcare providers and specialists
          </p>
        </div>
      </div>

      <div className="inline-flex rounded-full bg-muted p-1">
        {(["All Providers", "My Providers"] as const).map((tabItem) => (
          <button
            key={tabItem}
            onClick={() => setSessionTab(tabItem)}
            className={cn(
              "rounded-full px-5 py-1.5 text-sm capitalize transition-all",
              tabItem === sessionTab
                ? "bg-gradient-dash text-white"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tabItem}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex-1">
          <InputGroup className="bg-accent border-0 h-10">
            <InputGroupAddon>
              <Search className="size-4 text-muted-foreground" />
            </InputGroupAddon>

            <InputGroupInput
              type="search"
              placeholder="Search by name, specialty, or condition..."
              aria-label="Search providers"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </div>
        {sessionTab === "All Providers" && (
          <div className="flex gap-2 w-full md:w-auto">
            <Select onValueChange={setSpecialty}>
              <SelectTrigger className="w-40 bg-accent border-0">
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="psychology">Psychology</SelectItem>
                <SelectItem value="psychiatry">Psychiatry</SelectItem>
                <SelectItem value="dermatology">Dermatology</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setPriceRange}>
              <SelectTrigger className="w-40 bg-accent border-0">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="0-100">$0 - $100</SelectItem>
                <SelectItem value="100-150">$100 - $150</SelectItem>
                <SelectItem value="150+">$150+</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setRating}>
              <SelectTrigger className="w-40 bg-accent border-0">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="4">4.0+</SelectItem>
                <SelectItem value="4.5">4.5+</SelectItem>
                <SelectItem value="5">5.0</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {error && (
        <Card className="p-8 text-center text-red-500 shadow-md">
          <p>{error}</p>
        </Card>
      )}

      {!error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : filteredProviders.map((p: any) => (
                <Card key={p._id} className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="size-20 border border-slate-100 bg-white shadow-sm">
                      <AvatarFallback>
                        {`${p?.firstName?.[0] || ""}${p?.lastName?.[0] || ""}`}
                      </AvatarFallback>
                    </Avatar>

                    <div className="mt-4">
                      <div className="text-sm font-semibold">
                        {`${/^dr\.?\s/i.test(p?.firstName || "") ? "" : "Dr. "}${p?.firstName || ""} ${p?.lastName || ""}`}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {p?.specialty || "Specialist"}
                      </div>

                      <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground justify-center">
                        <div className="flex items-center gap-2">
                          <RatingStars rating={p?.rating ?? 0} />
                          <span className="font-semibold text-sm">
                            {p?.rating ?? 0}
                          </span>
                        </div>
                      </div>

                      <Badge className="mt-3 rounded-full bg-emerald-100 text-emerald-700 border-emerald-100 px-3 py-1 text-xs">
                        {p?.availableToday
                          ? "Available Today"
                          : "Not Available Today"}
                      </Badge>
                    </div>

                    <div className="mt-6 w-full flex items-center justify-between text-sm text-muted-foreground">
                      <div className="space-y-1">
                        <div>Experience</div>
                        <div>Session Fee</div>
                      </div>

                      <div className="text-right space-y-1">
                        <div className="font-medium">
                          {p?.experience ? `${p.experience} years` : "-"}
                        </div>
                        <div className="font-medium">
                          ${p?.sessionFee ?? "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 w-full flex gap-2">
                      <div className="flex-1">
                        <BookAppointmentDialog provider={p} />
                      </div>

                      {/* <PaymentDialog>
                      <Button
                        variant="outline"
                        className="w-full flex-1"
                        onClick={() => {
                          console.log("Provider amount:", p);
                          sessionStorage.setItem(
                            "providerAmount",
                            p?.sessionFee,
                          );
                        }}
                      >
                        Pay
                      </Button>
                    </PaymentDialog> */}
                    </div>
                  </div>
                </Card>
              ))}
        </div>
      )}

      {!error && !filteredProviders.length && !loading && (
        <p className="text-center text-sm text-muted-foreground">
          No providers found
        </p>
      )}

      {totalPages > 1 && (
        <nav className="mt-12 flex justify-center items-center space-x-2">
          <button
            disabled={page === 1}
            onClick={() => handleClick(page - 1)}
            className="p-2 rounded-lg border bg-white disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {pagination.map((p, idx) => (
            <button
              key={`${p}-${idx}`}
              onClick={() => typeof p === "number" && handleClick(p)}
              disabled={p === "..."}
              className={`px-4 py-2 rounded-lg border text-sm ${
                p === page ? "bg-gradient-primary text-white" : "bg-white"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            disabled={page === total}
            onClick={() => handleClick(page + 1)}
            className="p-2 rounded-lg border bg-white disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </nav>
      )}
    </div>
  );
}
