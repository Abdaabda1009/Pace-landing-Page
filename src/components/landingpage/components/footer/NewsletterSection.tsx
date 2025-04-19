import React, { useState } from "react";
import { supabase } from "@/lib/client";
import { Target, Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="relative border border-blue-600/50 rounded-xl p-6 sm:p-8 mb-12 sm:mb-16 overflow-hidden">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
        <div className="absolute -left-24 -bottom-24 w-64 h-64 rounded-full bg-purple-500 blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-full">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-blue-400">
                Stay Updated
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              Get Financial Tips & Updates
            </h3>

            <p className="text-gray-300 text-sm hidden md:block">
              Join our newsletter for exclusive tips, tools, and resources to
              help you achieve financial freedom.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {success ? (
              <div className="flex items-center gap-2 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full">
                {error && (
                  <div className="flex items-center gap-2 p-2 mb-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row w-full gap-3">
                  <div className="relative w-full">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 pl-10 rounded-lg bg-white/10 text-white placeholder:text-gray-400 border border-white/20 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
                      disabled={isLoading}
                      required
                    />
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition-all duration-200 disabled:opacity-70 min-w-[130px]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing</span>
                      </>
                    ) : (
                      <span>Subscribe</span>
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
