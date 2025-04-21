import { LandingNavbar } from "@/components/landingpage/components/Navbar/LandingNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Footer } from "../components/footer/Footer";
import { ChevronDown, ChevronUp, Bell } from "lucide-react";
import axios from "axios";
import { supabase } from "@/lib/client";

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
  const [expandedUpdate, setExpandedUpdate] = useState<number | null>(1); // Default to showing the first update
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      // Check if email already exists
      const { data: existing, error: lookupError } = await supabase
        .from("NewsLetterSubscription")
        .select("email")
        .eq("email", email)
        .maybeSingle();

      if (lookupError) {
        console.error("Lookup error:", lookupError);
        throw new Error("Error checking existing email");
      }
      if (existing) {
        setError("Email already exists in our newsletter list");
        setIsLoading(false);
        return;
      }

      // Insert the new signup record
      const { error: insertError } = await supabase
        .from("NewsLetterSubscription")
        .insert([
          {
            email: email,
            created_at: new Date().toISOString(),
            source: "NewsLetter",
          },
        ]);

      if (insertError) {
        console.error("Insert error:", insertError);
        throw new Error("Failed to subscribe, please try again later!");
      }

      // Send welcome email using the server endpoint
      const response = await axios.post("/api/send-email", { email });

      if (!response.data.success) {
        throw new Error("Failed to send welcome email");
      }

      // Success
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleUpdate = (id: number) => {
    setExpandedUpdate(expandedUpdate === id ? null : id);
  };



  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-gray-900 to-gray-950">
      <LandingNavbar />
      <div className="container mx-auto px-4 md:px-8 lg:px-12 pt-24 md:pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 space-y-6 text-center">
            <div className="inline-block p-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full mb-4">
              <span className="px-4 py-1 text-sm font-medium bg-gray-900 rounded-full text-blue-300 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Latest Updates
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              Changelog
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Stay updated with the latest improvements to PACE innovation.
              Subscribe to our newsletter for real-time updates.
            </p>
          </div>
        

          <div className="relative mb-20 max-w-lg mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg blur opacity-75"></div>
            <form
              onSubmit={handleSubmit}
              className="relative flex flex-col sm:flex-row gap-3 p-1 rounded-lg bg-gray-800/80 backdrop-blur-sm"
            >
              <div className="relative flex-grow">
                <Input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pl-10 bg-gray-900/70 border-gray-700 text-white placeholder:text-white/40 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full"
                  aria-label="Subscribe to updates"
                  disabled={isLoading}
                  required
                />
                <Bell
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
              <Button
                type="submit"
                className="h-12 px-6 font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:opacity-90 transition-all duration-200 shadow-lg shadow-blue-500/20"
              >
                Subscribe
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            {updates.map((update) => (
              <article
                key={update.id}
                className="group relative overflow-hidden rounded-xl bg-gray-800/30 backdrop-blur-lg border border-white/10 hover:border-blue-400/30 transition-all duration-300 shadow-lg shadow-blue-900/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                    <div className="flex items-center gap-3">
                      <time className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm font-medium">
                        {update.date}
                      </time>
                      <span className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm font-medium">
                        Version Update
                      </span>
                    </div>
                    <button
                      onClick={() => toggleUpdate(update.id)}
                      className="p-2 rounded-full bg-gray-700/50 hover:bg-blue-500/20 transition-colors text-gray-300 hover:text-white"
                      aria-label={
                        expandedUpdate === update.id
                          ? "Collapse details"
                          : "Expand details"
                      }
                    >
                      {expandedUpdate === update.id ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                  </div>

                  <h2 className="text-2xl font-bold mb-3 text-white group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {update.title}
                  </h2>

                  <p className="text-white/70 mb-6 leading-relaxed">
                    {update.content}
                  </p>

                  {expandedUpdate === update.id && (
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium text-white/90 mb-4">
                        New Features & Improvements
                      </h3>
                      <ul className="space-y-4">
                        {update.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-3 text-white/70 hover:text-white transition-colors group/item"
                          >
                            <div className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover/item:scale-125 transition-transform"></div>
                            <p className="leading-relaxed">{feature}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Load more button */}
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              className="border border-white/10 hover:border-blue-400/30 text-white/70 hover:text-white bg-white/5 backdrop-blur-lg px-6 py-5 rounded-lg transition-all duration-200"
            >
              Load Previous Updates
            </Button>
          </div>
        </div>
      </div>

      {/* Improved background effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[50%] w-[200%] h-[200%] opacity-20">
          <div className="absolute inset-0 animate-pulse-slow bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/30 via-transparent to-purple-700/30"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-gray-900/50 to-gray-950 opacity-70"></div>
      </div>
      <Footer />
    </div>
  );
};
