import React, { useState } from "react";
import { LandingNavbar } from "../components/Navbar/LandingNavbar";
import { Footer } from "../components/footer/Footer";
import { motion } from "framer-motion";
import { ChartColumn, ChartSpline, PiggyBank } from "lucide-react";
import { supabase } from "@/lib/client"; // Import supabase client from your lib

const Company = () => {
  const [showNotifyPopover, setShowNotifyPopover] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Check for existing email first - following the pattern from SignUp.tsx
      const { data: existing, error: lookupError } = await supabase
        .from("NewsLetterSubscription")
        .select("email")
        .eq("email", email)
        .maybeSingle();

      if (lookupError) {
        console.error("Lookup error:", lookupError);
        throw new Error("Error checking existing registrations");
      }

      if (existing) {
        throw new Error("This email is already registered");
      }

      // Insert the new signup record
      const { data, error: insertError } = await supabase
        .from("NewsLetterSubscription")
        .insert([
          {
            email: email,
            created_at: new Date().toISOString(),
            source: "company_page", // Track where this signup came from
          },
        ])
        .select();

      if (insertError) {
        console.error("Insert error:", insertError);
        throw new Error(insertError.message);
      }

      // Success - show confirmation
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
        setShowNotifyPopover(false);
      }, 3000);
    } catch (err) {
      console.error("Error saving email:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save your email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-dashboard text-foreground">
      <LandingNavbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-dashboard text-foreground py-16 md:py-24 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Pace Innovation
              </h1>
              <p className="text-lg md:text-xl ">
                Revolutionizing personal finance management with intuitive,
                powerful applications
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              ></motion.div>
            </motion.div>
          </div>
          <div
            className="absolute -bottom-12 left-0 right-0 h-24 bg-dashboard"
            style={{
              clipPath: "polygon(0 0, 100% 45%, 100% 100%, 0% 100%)",
            }}
          ></div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-dashboard relative">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                About <span className="text-primary">Pace</span>
              </h2>
              <div className="space-y-4 text-foreground/90">
                <p className="text-base leading-relaxed">
                  Pace Innovation is dedicated to simplifying financial
                  management through our suite of specialized applications. Our
                  platform empowers users to take control of their finances with
                  tools designed for modern needs.
                </p>
                <p className="text-base leading-relaxed">
                  Founded by a team of finance experts and technology
                  enthusiasts, Pace Innovation bridges the gap between complex
                  financial management and user-friendly technology. Our mission
                  is to make financial wellness accessible to everyone through
                  intuitive apps that address specific money management needs.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Apps Section */}
        <section className="py-16 bg-dashboard relative">
          <div className="absolute inset-0 bg-gradient-to-b from-dashboard to-dashboard-card/20 opacity-30 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              className="text-2xl md:text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our Financial <span className="text-primary">Solutions</span>
            </motion.h2>

            {/* Current App */}
            <motion.div
              className="mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
            >
              <h3 className="text-xl font-bold mb-6 text-center">
                Currently Available
              </h3>
              <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <div className="md:flex">
                  <div className="md:w-1/2 relative overflow-hidden">
                    <img
                      src=".\LandingAssets\Mock1.png"
                      alt="Subscription Management App"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      AVAILABLE NOW
                    </div>
                  </div>
                  <div className="p-6 md:p-8 md:w-1/2">
                    <h4 className="text-lg md:text-xl font-bold mb-6 text-primary">
                      Subscription Management
                    </h4>
                    <p className="text-foreground/80 mb-4 text-sm">
                      Take control of your recurring expenses with our powerful
                      subscription tracker. Monitor all your subscriptions in
                      one place, receive renewal reminders, and identify
                      opportunities to optimize your spending.
                    </p>
                    <ul className="mb-4 space-y-1 text-sm">
                      <li className="flex items-center text-foreground/70">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                        Track unlimited subscriptions
                      </li>
                      <li className="flex items-center text-foreground/70">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                        Smart renewal notifications
                      </li>
                      <li className="flex items-center text-foreground/70">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                        Spending insights and reports
                      </li>
                    </ul>
                    <button className="bg-primary text-primary-foreground py-2 px-4 text-sm rounded-md font-medium hover:bg-primary/90 transition-all duration-300">
                      Download Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Coming Soon */}
            <motion.div
              className="mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
            >
              <h3 className="text-xl font-bold mb-6 text-center">
                Coming Soon
              </h3>
              <div className="max-w-4xl mx-auto bg-dashboard-card text-foreground rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1">
                <div className="md:flex flex-row-reverse">
                  <div className="md:w-1/2 relative overflow-hidden">
                    <img
                      src="./LandingAssets/Debt-Managment.png"
                      alt="Debt Management App"
                      className="w-full h-full object-fit ml-6 transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                      COMING SOON
                    </div>
                  </div>
                  <div className="p-6 md:p-8 md:w-1/2">
                    <h4 className="text-lg md:text-xl font-bold mb-3 text-bold ">
                      Debt Management
                    </h4>
                    <p className="text-foreground/80 mb-4 text-sm">
                      Our upcoming debt management solution will help you create
                      a personalized plan to pay down debt efficiently. Track
                      multiple accounts, visualize your progress, and strategize
                      your path to financial freedom.
                    </p>
                    <ul className="mb-4 space-y-1 text-sm">
                      <li className="flex items-center text-foreground/70">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2"></span>
                        Personalized debt payoff strategies
                      </li>
                      <li className="flex items-center text-foreground/70">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2"></span>
                        Interest savings calculations
                      </li>
                      <li className="flex items-center text-foreground/70">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2"></span>
                        Progress tracking and milestones
                      </li>
                    </ul>
                    <div className="flex items-center">
                      <button
                        className="bg-primary/10 text-primary py-2 px-6 text-sm rounded-md font-medium hover:bg-primary/20 transition-all duration-300"
                        onClick={() => setShowNotifyPopover(true)}
                      >
                        Get notified
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Future Apps */}
            <div>
              <h3 className="text-xl font-bold mb-8 text-center">
                More Financial Apps Coming Soon
              </h3>
              <motion.div
                className="grid md:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.div
                  className="bg-dashboard-card rounded-lg shadow-md p-6 text-center text-foreground group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  variants={fadeIn}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <PiggyBank className="w-6 h-6 object-contain" />
                    </div>
                    <h4 className="text-base font-bold mb-2">Budget Planner</h4>
                    <p className="text-foreground/70 mb-4 text-sm">
                      Create and maintain personalized budgets with smart
                      categorization and insights
                    </p>
                    <span className="text-primary text-xs font-medium">
                      Coming Q3 2025
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  className="bg-dashboard-card rounded-lg shadow-md p-6 text-center text-foreground group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  variants={fadeIn}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <ChartSpline className="w-6 h-6 object-contain" />
                    </div>
                    <h4 className="text-base font-bold mb-2">
                      Investment Tracker
                    </h4>
                    <p className="text-foreground/70 mb-4 text-sm">
                      Monitor and analyze your investment portfolio performance
                      with advanced analytics
                    </p>
                    <span className="text-primary text-xs font-medium">
                      Coming Q4 2025
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  className="bg-dashboard-card rounded-lg shadow-md p-6 text-center text-foreground group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  variants={fadeIn}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <ChartColumn className="w-6 h-6 object-contain" />
                    </div>
                    <h4 className="text-base font-bold mb-2">
                      Expense Analyzer
                    </h4>
                    <p className="text-foreground/70 mb-4 text-sm">
                      Gain insights into your spending habits with powerful
                      analytics and recommendations
                    </p>
                    <span className="text-primary text-xs font-medium">
                      Coming Q1 2026
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-16 bg-dashboard relative">
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl -z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Our <span className="text-primary">Vision</span>
              </h2>
              <div className="bg-dashboard-card/50 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-md border border-primary/10">
                <div className="space-y-4 text-center">
                  <p className="text-base leading-relaxed">
                    At Pace Innovation, we envision a world where everyone has
                    access to powerful yet simple tools for financial wellness.
                    We're building a comprehensive ecosystem of specialized
                    finance applications that work seamlessly together, allowing
                    you to customize your financial management approach.
                  </p>
                  <p className="text-base leading-relaxed">
                    Our commitment to innovation, security, and user experience
                    drives us to continuously improve our offerings and expand
                    our suite of financial tools to meet the evolving needs of
                    our users.
                  </p>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    className="bg-primary/10 text-primary py-2 px-6 text-sm rounded-md font-medium hover:bg-primary/20 transition-all duration-300"
                    onClick={() => setShowNotifyPopover(true)}
                  >
                    Join Our Journey
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Email Notification Popover */}
      {showNotifyPopover && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            className="bg-dashboard-card rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Get Notified</h3>
              <button
                onClick={() => setShowNotifyPopover(false)}
                className="text-foreground/60 hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {isSubmitted ? (
              <div className="text-center py-4">
                <div className="text-accent mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-medium text-lg mb-1">
                  Thanks for subscribing!
                </h4>
                <p className="text-foreground/70">
                  We'll notify you when our Debt Management app is available.
                </p>
              </div>
            ) : (
              <>
                <p className="text-foreground/70 mb-4">
                  Be the first to know when our Debt Management app launches.
                  We'll send you a notification as soon as it's available.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-dashboard border border-foreground/20 rounded-md focus:outline-none focus:border-accent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="consent"
                      className="h-4 w-4 accent-accent"
                      required
                    />
                    <label
                      htmlFor="consent"
                      className="ml-2 text-sm text-foreground/70"
                    >
                      I agree to receive notifications about product updates
                    </label>
                  </div>
                  {error && (
                    <div className="mb-4 p-2 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm">
                      {error}
                    </div>
                  )}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="mr-2 px-4 py-2 text-sm border border-foreground/20 rounded-md hover:bg-dashboard-card"
                      onClick={() => setShowNotifyPopover(false)}
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm bg-accent text-accent-foreground rounded-md hover:bg-accent/90 disabled:opacity-70 flex items-center"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Company;
