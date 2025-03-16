import { LandingNavbar } from "@/components/landingpage/components/Navbar/LandingNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const updates = [
  {
    id: 1,
    date: "April 1, 2024",
    title: "Beta Pre-Release",
    content:
      "Launching PACE Finance with core features to help you manage your financial life effectively.",
    features: [
      "Finalized all core features, including subscription tracker, budget planner, and debt management, ensuring MVP functionality is stable and user-friendly.",
      "Enhanced navigation menus for better accessibility and improved mobile responsiveness. Added right-aligned menu for a modern layout and streamlined user interactions.",
      "Resolved issues with dropdown positioning, menu collapsibility, and authentication button alignment. Fixed minor visual inconsistencies in the appearance settings cards.",
      "Minimized asset load times and optimized components for smoother performance on low-end devices. Reduced memory usage in key app modules.",
      "Incorporated feedback from alpha testers, refining error messages, and improving layout flexibility.",
    ],
  },
];

export const Changelog = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <div className="min-h-screen text-white ">
      <LandingNavbar />
      <div className="container mx-auto px-4 md:px-8 lg:px-12 pt-24 md:pt-32 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 space-y-4 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600/40 to-purple-200 bg-clip-text text-transparent">
              Changelog
            </h1>
            <p className="text-lg text-white/60">
              Stay updated with the latest improvements to PACE innovation
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col md:flex-row gap-4 mb-16 max-w-md mx-auto md:mx-0"
          >
            <Input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-blue-300"
              aria-label="Subscribe to updates"
            />
            <Button
              type="submit"
              className="w-full md:w-auto px-8 py-4 transition-transform hover:scale-105 hover:bg-blue-200/20 transition-colors duration-200"
            >
              Subscribe for Updates
            </Button>
          </form>

          <div className="space-y-12">
            {updates.map((update) => (
              <article
                key={update.id}
                className="relative p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <time className="text-sm text-blue-300 mb-2 md:mb-0">
                    {update.date}
                  </time>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                    Version Update
                  </span>
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-100">
                  {update.title}
                </h2>
                <p className="text-white/80 mb-6">{update.content}</p>
                <ul className="space-y-4">
                  {update.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3 text-white/80 hover:text-white transition-colors"
                    >
                      <div className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-400 rounded-full" />
                      <p className="leading-relaxed">{feature}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Animated background gradient */}
      <div className="fixed -bottom-[50%] -left-[25%] w-[150vw] h-[150vh] opacity-15 pointer-events-none">
        <div className="absolute inset-0 animate-pulse-slow bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/30 via-transparent to-purple-600/30" />
      </div>
    </div>
  );
};