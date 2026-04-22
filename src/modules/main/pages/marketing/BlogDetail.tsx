"use client";
import KeyTakeaways from "@/modules/main/components/blog/KeyTakeaways";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Sparkles, MessageSquare, Quote, ExternalLinkIcon } from "lucide-react";
import SidebarTOC, {
  type TocItem,
} from "@/modules/main/components/blog/SidebarTOC";
import RecommendedArticles from "@/modules/main/components/blog/RecommendedArticles";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router";
import { publicPageApi } from "@/api/publicpage.api";
import { useEffect, useState } from "react";
import { Link } from "react-router";

type BlogReference = {
  label: string;
  url: string;
};

type BlogViewData = {
  title: string;
  date: string;
  authors: Array<{
    name: string;
    role: string;
    title: string;
    bio: string;
    avatar: string;
  }>;
  aiSummary: string;
  takeaways: string[];
  references: BlogReference[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonLabel: string;
  ctaButtonUrl: string;
  ctaButtonTarget: string;
};

export default function Page() {
  const slug = useParams().slug as string;

  const [blog, setBlog] = useState<any>(null);
  const [relatedPost, setRelatedPost] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogDetail = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await publicPageApi.getBlogDetail(slug);
      const formatted = (res?.data?.relatedPosts ?? []).map((item: any) => ({
        title: item.title,
        href: `/blog/${item.slug}`,
        category: item.category,
        date: new Date(item.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        description: item.excerpt,
        image: item.coverImageUrl || "",
      }));
      setRelatedPost(formatted);
      setBlog(res?.data || null);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchBlogDetail();
    }
  }, [slug]);

  if (loading)
    return (
      <p className="text-center h-[300px] flex items-center justify-center">
        Loading...
      </p>
    );

  if (error)
    return (
      <p className="text-center h-[300px] flex items-center justify-center">
        {error}
      </p>
    );

  if (!blog)
    return (
      <p className="text-center h-[300px] flex items-center justify-center">
        No blog found
      </p>
    );

  const data: BlogViewData = {
    title: blog?.post?.title || "",
    date: blog?.post?.publishedAt
      ? new Date(blog.post.publishedAt).toDateString()
      : "",
    authors: [
      {
        name: blog?.post?.author || "",
        role: "Written by",
        title: "",
        bio: blog?.post?.authorBio || "",
        avatar: blog?.post?.authorImageUrl || "",
      },
    ],
    aiSummary: blog?.post?.excerpt || "",
    takeaways: [blog?.post?.excerpt || ""],
    references: (blog?.post?.references ?? []).map((ref: any) => ({
      label: ref.label || ref.title || ref.url || "Reference",
      url: ref.url || "#",
    })),
    ctaTitle: blog?.post?.ctaTitle || "",
    ctaSubtitle: blog?.post?.ctaSubtitle || "",
    ctaButtonLabel: blog?.post?.ctaButtonLabel || "",
    ctaButtonUrl: blog?.post?.ctaButtonUrl || "/patient-register",
    ctaButtonTarget: blog?.post?.ctaButtonTarget || "",
  };
  const [mainTitle, subTitle] = data.title.split(": ");
  const tocItems: TocItem[] = [
    { id: "what-is-clonidine", label: "What Is Clonidine?" },
    {
      id: "how-it-works-for-anxiety",
      label: "How Clonidine Works For Anxiety",
    },
    { id: "dosage-forms", label: "Dosage & Forms" },
    { id: "how-to-take-it", label: "How to take it" },
    { id: "how-fast-it-works", label: "How fast it works" },
    { id: "side-effects-warnings", label: "Side effects & warnings" },
    { id: "drug-interactions", label: "Drug interactions" },
    { id: "is-it-safe-for-adults", label: "Is it safe for adults?" },
    { id: "alternatives", label: "Alternatives" },
    { id: "conclusion", label: "Conclusion" },
    { id: "faq", label: "FAQ" },
  ];

  const faqItems =
    blog?.post?.faqs?.map((f: any) => ({
      question: f.question,
      answer: f.answer,
    })) || [];

  return (
    <div className="">
      <Container className="py-16">
        <div className="flex gap-8 relative ">
          <div className="">
            <header className="max-w-3xl mb-8">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">
                <span className="text-teal-600">{mainTitle}:</span>
                <br />
                {subTitle}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                {"authors" in data &&
                  data.authors.map((a, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 border border-slate-200 rounded-full py-2 px-2 bg-white shadow-sm"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={a.avatar}
                          alt={a.name}
                          className="object-cover"
                        />

                        <AvatarFallback>
                          {a.name
                            .split(" ")
                            .slice(0, 2)
                            .map((p: any) => p[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p className="text-xs text-muted-foreground">
                          {a.role}
                        </p>
                        <p className="font-medium text-slate-900">{a.name}</p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex items-center gap-3 mt-6">
                <Button
                  variant="outline"
                  className="rounded-full text-purple-600 border-purple-200 bg-purple-50 hover:bg-purple-100 hover:text-purple-700"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Summary
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ask AI
                </Button>
              </div>
            </header>

            <div>
              <KeyTakeaways items={data.takeaways} />
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{
                  __html: blog?.post?.content || "",
                }}
              />
              <div className="prose prose-slate max-w-none mt-12">
                <section id="what-is-clonidine" className="mt-12 not-prose">
                  {/* <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    What Is Clonidine?
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Clonidine is a medication primarily developed to manage high
                    blood pressure, but it has proven effective in treating
                    various conditions including anxiety disorders. As an
                    alpha-2 adrenergic agonist, it works by modulating certain
                    receptors in the brain and nervous system.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    While not FDA-approved specifically for anxiety, healthcare
                    providers often prescribe clonidine off-label to help manage
                    anxiety symptoms, particularly when combined with other
                    therapeutic approaches. It’s available in several forms
                    including tablets, patches, and extended-release
                    formulations.
                  </p> */}
                </section>

                <section
                  id="how-it-works-for-anxiety"
                  className="mt-12 not-prose"
                >
                  {/* <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    <span className="text-teal-600">How Clonidine Works</span>{" "}
                    For Anxiety
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Clonidine helps reduce anxiety by calming the overactive
                    “fight or flight” response in your nervous system. It
                    stimulates alpha-2 receptors in the brain, which leads to
                    decreased release of norepinephrine — a stress hormone that
                    can trigger anxiety symptoms.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    By reducing norepinephrine levels, clonidine can help lower
                    heart rate, decrease blood pressure, and create a calming
                    effect that many people with anxiety find beneficial. This
                    mechanism makes it particularly useful for anxiety that
                    manifests with physical symptoms like rapid heartbeat or
                    sweating.
                  </p> */}
                  <div className="mt-8 bg-teal-50 rounded-2xl p-6 relative">
                    <Quote className="w-8 h-8 text-teal-500 mb-4 rotate-180 fill-teal-500" />
                    <p className="italic text-slate-700 text-lg mb-6">
                      “Clonidine can be a valuable tool for patients
                      experiencing anxiety with significant physical symptoms.
                      It’s especially helpful when traditional anti-anxiety
                      medications haven’t provided adequate relief.”
                    </p>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="/avatars/sarah.jpg"
                          alt="Dr. Sarah Mitchell, MD"
                          className="object-cover"
                        />
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm m-0">
                          Dr. Sarah Mitchell, MD
                        </p>
                        <p className="text-xs text-slate-500 m-0">
                          Psychiatrist
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="dosage-forms" className="mt-12 not-prose">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    Dosage &amp; Forms
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    Clonidine is available in multiple formulations to suit
                    different treatment needs:
                  </p>
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      </div>
                      <p className="text-slate-700 m-0">
                        <strong className="text-slate-900 font-semibold">
                          Immediate-release tablets:
                        </strong>{" "}
                        Typically 0.1mg to 0.3mg, taken 2-3 times daily
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      </div>
                      <p className="text-slate-700 m-0">
                        <strong className="text-slate-900 font-semibold">
                          Transdermal patches:
                        </strong>{" "}
                        Released slowly over 7 days, available in various
                        strengths
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      </div>
                      <p className="text-slate-700 m-0">
                        <strong className="text-slate-900 font-semibold">
                          Extended-release tablets:
                        </strong>{" "}
                        Taken once or twice daily for consistent coverage
                      </p>
                    </li>
                  </ul>
                  <p className="text-slate-600 leading-relaxed mt-6">
                    Your healthcare provider will determine the appropriate
                    dosage based on your specific symptoms, medical history, and
                    response to treatment. Dosages for anxiety are typically
                    lower than those used for blood pressure management.
                  </p>
                </section>

                <section id="how-to-take-it" className="mt-12 not-prose">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    How To Take Clonidine
                  </h2>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-teal-600 shrink-0 mt-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <p className="text-slate-700 leading-relaxed">
                          Take at the same time each day to maintain steady
                          levels
                        </p>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-teal-600 shrink-0 mt-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <p className="text-slate-700 leading-relaxed">
                          Can be taken with or without food
                        </p>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-teal-600 shrink-0 mt-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <p className="text-slate-700 leading-relaxed">
                          Swallow tablets whole—don’t crush or chew
                          extended-release forms
                        </p>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-teal-600 shrink-0 mt-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <p className="text-slate-700 leading-relaxed">
                          If using patches, apply to clean, dry skin and rotate
                          application sites
                        </p>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-teal-600 shrink-0 mt-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <p className="text-slate-700 leading-relaxed">
                          Never stop abruptly—always taper under medical
                          supervision
                        </p>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* call to action banner */}
                <div className="mt-8 bg-linear-to-r from-teal-600 to-teal-400 text-white rounded-2xl p-8 text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    {data?.ctaTitle}
                  </h3>
                  <p className="mb-4">{data?.ctaSubtitle}</p>
                  <Link to={data?.ctaButtonUrl}>
                    <Button className="bg-white text-teal-600 hover:bg-gray-100">
                      {data?.ctaButtonLabel} ➔
                    </Button>
                  </Link>
                </div>

                <section id="how-fast-it-works" className="mt-12 not-prose">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    How Fast Does Clonidine Work?
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    The onset of clonidine’s effects varies depending on the
                    formulation:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-slate-200 rounded-2xl p-6">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        Immediate-Release
                      </h4>
                      <p className="text-slate-700 leading-relaxed">
                        Effects typically begin within 30-60 minutes, with peak
                        benefits around 2-4 hours after taking.
                      </p>
                    </div>
                    <div className="border border-slate-200 rounded-2xl p-6">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        Transdermal Patch
                      </h4>
                      <p className="text-slate-700 leading-relaxed">
                        Takes 2-3 days to reach therapeutic levels, providing
                        steady relief once established.
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed mt-6">
                    Full therapeutic benefits for anxiety management may take
                    several weeks of consistent use. Patience and regular
                    communication with your healthcare provider are essential
                    during the adjustment period.
                  </p>
                </section>

                <section id="side-effects-warnings" className="mt-12 not-prose">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    Side Effects &amp; Warnings
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="border border-slate-200 rounded-2xl p-6">
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Common Side Effects
                      </h3>
                      <ul className="list-disc list-inside text-slate-700 space-y-1">
                        <li>Drowsiness or fatigue</li>
                        <li>Dry mouth</li>
                        <li>Dizziness</li>
                        <li>Constipation</li>
                        <li>Headache</li>
                      </ul>
                    </div>
                    <div className="border border-red-200 rounded-2xl p-6">
                      <h3 className="font-semibold text-slate-900 mb-2">
                        Serious Side Effects
                      </h3>
                      <ul className="list-disc list-inside text-slate-700 space-y-1">
                        <li>Severe dizziness or fainting</li>
                        <li>Very low blood pressure</li>
                        <li>Slow or irregular heartbeat</li>
                        <li>Difficulty breathing</li>
                        <li>Severe allergic reactions</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg text-red-800">
                    <div className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-sm">
                        <strong>Important Safety Warning</strong> – Stopping
                        clonidine suddenly can cause dangerous rebound
                        hypertension (sudden spike in blood pressure), rapid
                        heartbeat, and severe anxiety. Always consult your
                        healthcare provider before making any changes to your
                        medication regimen.
                      </p>
                    </div>
                  </div>
                </section>

                <section id="drug-interactions" className="mt-12 not-prose">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    Drug Interactions
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Clonidine can interact with various medications and
                    substances. Inform your healthcare provider about all
                    medications you’re taking, including:
                  </p>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-4">
                    <div className="space-y-2">
                      <p>
                        <strong>Sleep medications and sedatives:</strong> May
                        increase drowsiness and sedation
                      </p>
                      <p>
                        <strong>Alcohol:</strong> Can enhance sedative effects
                        and lower blood pressure dangerously
                      </p>
                      <p>
                        <strong>
                          Antidepressants (especially tricyclics):
                        </strong>
                        May reduce clonidine’s effectiveness
                      </p>
                      <p>
                        <strong>Beta-blockers:</strong> Combined use requires
                        careful monitoring
                      </p>
                      <p>
                        <strong>Other blood pressure medications:</strong> May
                        cause excessive blood pressure lowering
                      </p>
                    </div>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg text-yellow-800">
                    <p className="text-sm">
                      <strong>Caution:</strong> Always disclose your complete
                      medication list to your healthcare provider, including
                      over-the-counter drugs, supplements, and herbal products.
                    </p>
                  </div>
                </section>

                <section id="is-it-safe-for-adults" className="mt-12 not-prose">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    Is Clonidine Safe For Adults With Anxiety?
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    When prescribed and monitored by a healthcare professional,
                    clonidine can be a safe option for managing anxiety in
                    adults. However, it’s not suitable for everyone.
                  </p>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
                    <h3 className="font-semibold text-slate-900 mb-2">
                      Who Should Avoid Clonidine
                    </h3>
                    <ul className="list-disc list-inside text-slate-700 space-y-1">
                      <li>Individuals with certain heart conditions</li>
                      <li>Those with a history of severe low blood pressure</li>
                      <li>
                        People with kidney disease (may require dose adjustment)
                      </li>
                      <li>
                        Pregnant or breastfeeding individuals (consult your
                        doctor)
                      </li>
                    </ul>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Regular monitoring, including blood pressure checks, is
                    essential when using clonidine. Your healthcare provider
                    will assess whether this medication is appropriate for your
                    specific situation and overall health profile.
                  </p>
                </section>

                <section id="conclusion" className="mt-12 not-prose">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    Conclusion
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Clonidine represents a viable off-label option for anxiety
                    management, particularly for individuals who experience
                    significant physical symptoms or haven’t responded well to
                    traditional anti-anxiety medications. Its unique mechanism
                    of calming the nervous system can provide meaningful relief
                    when used appropriately.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    However, clonidine is not without risks. The potential for
                    side effects, drug interactions, and dangerous rebound
                    effects upon discontinuation means this medication requires
                    careful medical supervision. It’s essential to work closely
                    with a qualified healthcare provider who can monitor your
                    response and adjust treatment as needed.
                  </p>
                  <p className="text-slate-600 leading-relaxed mt-4">
                    If you’re struggling with anxiety, remember that effective
                    treatments are available. Whether clonidine or another
                    approach is right for you depends on your individual
                    circumstances, symptoms, and health profile. A comprehensive
                    evaluation by a mental health professional is the first step
                    toward finding relief.
                  </p>
                </section>

                <section id="faq" className="mt-12 not-prose">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    Frequently Asked Questions
                  </h2>
                  {faqItems.map(
                    (
                      item: { question: string; answer: string },
                      idx: number,
                    ) => (
                      <Accordion
                        key={idx}
                        type="single"
                        collapsible
                        className="mb-2"
                      >
                        <AccordionItem value={`faq-${idx}`}>
                          <AccordionTrigger className="p-3">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="p-3 pt-0">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ),
                  )}
                </section>

                <Card id="about-authors" className="mt-12 not-prose p-6 gap-0">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                    About the Authors
                  </h2>
                  <div
                    className={`grid grid-cols-1 ${
                      data.authors.length > 1 ? "md:grid-cols-2" : ""
                    } gap-8 mb-6 pb-6 border-b`}
                  >
                    {data.authors.map((a, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage
                            src={a.avatar}
                            alt={a.name}
                            className="object-cover"
                          />

                          <AvatarFallback>
                            {a.name
                              .split(" ")
                              .map((p: string) => p[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-900 text-lg m-0">
                            {a.name}
                          </p>
                          {a.title && (
                            <p className="text-sm text-slate-500 m-0">
                              {a.title}
                            </p>
                          )}
                          {a.bio && (
                            <p className="text-slate-700 mt-2">{a.bio}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    Medical Sources &amp; References
                  </h3>
                  <ul className="">
                    {data.references.map((ref, idx) => (
                      <li key={idx}>
                        <Link
                          to={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="link" className="px-0">
                            {ref.label}
                            <ExternalLinkIcon />
                          </Button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </div>
          <aside className="shrink-0">
            <SidebarTOC items={tocItems} />
          </aside>
        </div>

        <RecommendedArticles relatedPost={relatedPost ?? []} />
      </Container>
    </div>
  );
}
