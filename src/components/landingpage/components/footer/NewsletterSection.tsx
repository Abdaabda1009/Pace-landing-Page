import React, { useState } from "react";
import { supabase } from "@/lib/client";
import { Target } from "lucide-react";


export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
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
      const { data: existing, error: lookupError } = await supabase
        .from("NewsLetterSubscription")
        .select("email")
        .eq("email", email)
        .maybeSingle();

      if (lookupError) {
        console.error("Lookup error:", lookupError);
        throw new Error("Error, Checking existing email");
      }
      if (existing) {
        setError("Email already exists in our newsletter list");
      }

      // Insert the new signup record
      const { data, error: insertError } = await supabase
        .from("NewsLetterSubscription")
        .insert([
          {
            email: email,
            created_at: new Date().toISOString(),
            source: "NewsLetter", // Track where the sign up comes from
          },
        ]);

      if (insertError) {
        console.error("Insert error:", insertError);
        throw new Error("Failed to subscribem please try again later!");
      }

      // Success
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };





  return (
    <div className="border border-blue-600/50 rounded-xl p-4 sm:p-8 mb-12 sm:mb-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-white text-center md:text-left">
          Subscribe Newsletter
        </h3>
        {success ? (
          <div className="text-green-500 text-sm font-medium">
            Thank you for Subscribing to our newsletter!
            </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-sm font-medium">
                {error}
              </div>
            )}

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full md:w-80 px-4 py-2 rounded-lg bg-white/20 text-white placeholder:text-white/70 border border-white/20 focus:outline-none focus:border-white/40"
            disabled={isLoading}
            required
          />
          <button 
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-6 py-2 border border-blue-600/50 text-white-400 rounded-lg font-medium hover:bg-blue-200/20 text-white transition-colors"
              >
                {isLoading ? "Processing..." : "Subscribe"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
