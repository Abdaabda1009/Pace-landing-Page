import React, { useState } from "react";
import { LandingNavbar } from "../components/Navbar/LandingNavbar";
import { Footer } from "../components/footer/Footer";
import { motion } from "framer-motion";
import { 
  ChartColumn, 
  ChartSpline, 
  PiggyBank, 
  Award, 
  Shield, 
  Users, 
  Lightbulb,
  Clock,
  Zap,
  Star,
  UsersRound,
  User
} from "lucide-react";
import { supabase } from "@/lib/client"; // Import supabase client from your lib
import axios from "axios";

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

  const slideIn = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Check for existing email first
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
      const { error: insertError } = await supabase
        .from("NewsLetterSubscription")
        .insert([
          {
            email: email,
            created_at: new Date().toISOString(),
            source: "company_page", // Track where this signup came from
          },
        ]);

      if (insertError) {
        console.error("Insert error:", insertError);
        throw new Error(insertError.message);
      }

      // Send welcome email using the server endpoint
      const response = await axios.post("/api/send-email", { email });

      if (!response.data.success) {
        throw new Error("Failed to send welcome email");
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
      console.error("Error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-dashboard text-foreground">
      <LandingNavbar />

      <main className="flex-grow">
        {/* Enhanced Hero Section */}
        <section className="bg-dashboard text-foreground py-20 md:py-28 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 z-0"></div>
          <div className="absolute top-20 left-10 w-24 h-24 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                className="max-w-2xl mb-10 md:mb-0"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Financial Freedom, <br />
                  One App at a Time
                </h1>
                <p className="text-lg md:text-xl mb-8 text-foreground/80">
                  At Pace Innovation, we're creating a suite of specialized
                  financial tools that work together to simplify money
                  management and empower your financial journey.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-primary text-primary-foreground py-3 px-6 rounded-md font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20">
                    Download Our App
                  </button>
                  <button
                    className="bg-transparent border border-foreground/20 text-foreground py-3 px-6 rounded-md font-medium hover:bg-foreground/10 transition-all duration-300"
                    onClick={() => setShowNotifyPopover(true)}
                  >
                    Join Our Newsletter
                  </button>
                </div>
              </motion.div>

              <motion.div
                className="md:w-5/12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-accent/30 rounded-xl blur-lg"></div>
                  <img
                    src="public/assets/logoicon.png"
                    alt="Pace financial apps on multiple devices"
                    className="relative w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-lg shadow-xl z-10"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <div
            className="absolute -bottom-12 left-0 right-0 h-24 bg-dashboard"
            style={{
              clipPath: "polygon(0 0, 100% 45%, 100% 100%, 0% 100%)",
            }}
          ></div>
        </section>

        {/* Stats Section - New */}
        <section className="py-12 bg-dashboard">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-dashboard-card p-6 rounded-lg border border-primary/10 shadow-md text-center"
                variants={fadeIn}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  600+
                </h3>
                <p className="text-foreground/70">Active Users</p>
              </motion.div>
              <motion.div
                className="bg-dashboard-card p-6 rounded-lg border border-primary/10 shadow-md text-center"
                variants={fadeIn}
              >
                <Star className="w-6 h-6 w-full text-blue-400 " />
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  3.6
                </h3>
                <p className="text-foreground/70">App Store Rating</p>
              </motion.div>
              <motion.div
                className="bg-dashboard-card p-6 rounded-lg border border-primary/10 shadow-md text-center"
                variants={fadeIn}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  2019
                </h3>
                <p className="text-foreground/70">Founded</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced About Section */}
        <section className="py-16 bg-dashboard relative">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-5xl mx-auto md:flex items-center gap-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="md:w-1/2 mb-8 md:mb-0">
                <div className="relative">
                  <div className="absolute -inset-2 bg-transparent rounded-xl blur-md"></div>
                  <UsersRound
                    className="transparent w-64 h-64 ml-32 text-blue-400 rounded-lg shadow-lg z-10"
                  />
                </div>
              </div>

              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  About <span className="text-primary">Pace Innovation</span>
                </h2>
                <div className="space-y-4 text-foreground/90">
                  <p className="text-base leading-relaxed">
                    Pace Innovation was founded in 2019 by a team of financial
                    analysts, software engineers, and UX designers who saw a gap
                    in the personal finance market: too many all-in-one
                    solutions that did everything adequately, but nothing
                    exceptionally well.
                  </p>
                  <p className="text-base leading-relaxed">
                    Our approach is different. We build specialized applications
                    that excel at solving specific financial challenges, while
                    maintaining a consistent ecosystem that allows our apps to
                    work seamlessly together.
                  </p>
                  <p className="text-base leading-relaxed">
                    Headquartered in Boston with a remote team across North
                    America and Europe, we've grown from a small startup to a
                    team of 32 passionate individuals committed to transforming
                    how people manage their finances.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Values - New Section */}
        <section className="py-16 bg-dashboard/50 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-dashboard-card/10 to-transparent z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              className="text-2xl md:text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our Core <span className="text-primary">Values</span>
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-dashboard-card rounded-lg p-6 shadow-md border border-primary/10"
                variants={fadeIn}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-3">Security First</h3>
                <p className="text-foreground/70 text-sm">
                  We prioritize the security of your financial data above all
                  else, implementing bank-level encryption and strict privacy
                  policies.
                </p>
              </motion.div>

              <motion.div
                className="bg-dashboard-card rounded-lg p-6 shadow-md border border-primary/10"
                variants={fadeIn}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-3">
                  Continuous Innovation
                </h3>
                <p className="text-foreground/70 text-sm">
                  We stay ahead of financial trends and technology advances to
                  provide solutions that adapt to changing needs and challenges.
                </p>
              </motion.div>

              <motion.div
                className="bg-dashboard-card rounded-lg p-6 shadow-md border border-primary/10"
                variants={fadeIn}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-3">Customer Empowerment</h3>
                <p className="text-foreground/70 text-sm">
                  We believe in giving you the tools and knowledge to make
                  confident financial decisions rather than making them for you.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Leadership Team - New Section */}
        <section className="py-16 bg-dashboard relative">
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              className="text-2xl md:text-3xl font-bold mb-4 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our <span className="text-primary">Leadership</span> Team
            </motion.h2>

            <motion.p
              className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Meet the passionate individuals guiding our mission to transform
              personal finance management
            </motion.p>

            <motion.div
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-dashboard-card rounded-lg overflow-hidden shadow-md group"
                variants={fadeIn}
              >
                <div className="h-60 overflow-hidden">
                  <User className="w-full h-full object-cover transition-transform text-blue-400 duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold">Abdallah</h3>
                  <p className="text-primary text-sm mb-3">CEO & Founder</p>
                  <p className="text-foreground/70 text-sm">
                    Former fintech consultant with 15+ years of experience in
                    building user-centered financial products.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="bg-dashboard-card rounded-lg overflow-hidden shadow-md group"
                variants={fadeIn}
              >
                <div className="h-60 overflow-hidden">
                  <User className="w-full h-full object-cover transition-transform text-blue-400 duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold">Marcus Rodriguez</h3>
                  <p className="text-primary text-sm mb-3">
                    Fullstack-Developer, Fintech Developer
                  </p>
                  <p className="text-foreground/70 text-sm">
                    Software architect with previous experience at major
                    financial institutions, focusing on secure and scalable
                    solutions.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="bg-dashboard-card rounded-lg overflow-hidden shadow-md group"
                variants={fadeIn}
              >
                <div className="h-60 overflow-hidden">
                  <User className="w-full h-full object-cover transition-transform text-blue-400 duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold">Aisha Patel</h3>
                  <p className="text-primary text-sm mb-3">UI/UX Design</p>
                  <p className="text-foreground/70 text-sm">
                    Award-winning UX designer specialized in creating intuitive
                    interfaces for complex financial data and processes.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Apps Section */}
        <section className="py-16 bg-dashboard relative">
          <div className="absolute inset-0 bg-gradient-to-b from-dashboard to-dashboard-card/20 opacity-30 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Our Financial <span className="text-primary">Solutions</span>
              </h2>
              <p className="text-foreground/70">
                Specialized applications working seamlessly together to address
                every aspect of your financial life
              </p>
            </motion.div>

            {/* Current App */}
            <motion.div
              className="mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
            >
              <div className="flex items-center justify-center mb-8">
                <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Currently Available
                </span>
              </div>
              <div className="max-w-5xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
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
                  <div className="p-8 md:w-1/2">
                    <div className="flex items-center mb-4">
                      <Clock className="w-5 h-5 text-primary mr-2" />
                      <h4 className="text-xl md:text-2xl font-bold text-primary">
                        Subscription Management
                      </h4>
                    </div>
                    <p className="text-foreground/80 mb-6">
                      Take control of your recurring expenses with our powerful
                      subscription tracker. Monitor all your subscriptions in
                      one place, receive renewal reminders, and identify
                      opportunities to optimize your spending.
                    </p>
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                        <span className="text-foreground/70">
                          Track unlimited subscriptions
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                        <span className="text-foreground/70">
                          Smart renewal notifications
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                        <span className="text-foreground/70">
                          Spending insights and reports
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                        <span className="text-foreground/70">
                          Cancel subscriptions with one click
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-primary text-primary-foreground py-2 px-6 text-sm rounded-md font-medium hover:bg-primary/90 transition-all duration-300 flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M17.707,12.293c0.391-0.391,0.391-1.023,0-1.414l-7-7c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L15.586,11H3 c-0.553,0-1,0.447-1,1s0.447,1,1,1h12.586l-6.293,6.293c-0.391,0.391-0.391,1.023,0,1.414C9.488,20.902,9.744,21,10,21 s0.512-0.098,0.707-0.293L17.707,12.293z" />
                        </svg>
                        Download Now
                      </button>
                      <a
                        href="#"
                        className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
                      >
                        Learn more
                        <svg
                          className="w-4 h-4 ml-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Coming Soon */}
            <motion.div
              className="mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
            >
              <div className="flex items-center justify-center mb-8">
                <span className="px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                  Coming Soon - Q3 2025
                </span>
              </div>
              <div className="max-w-5xl mx-auto bg-dashboard-card text-foreground rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:shadow-accent/10">
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
                  <div className="p-8 md:w-1/2">
                    <div className="flex items-center mb-4">
                      <Zap className="w-5 h-5 text-accent mr-2" />
                      <h4 className="text-xl md:text-2xl font-bold">
                        Debt Management
                      </h4>
                    </div>
                    <p className="text-foreground/80 mb-6">
                      Our upcoming debt management solution creates a
                      personalized plan to pay down debt efficiently. Track
                      multiple accounts, visualize your progress, and follow a
                      clear path to financial freedom with AI-powered
                      recommendations.
                    </p>
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-2"></span>
                        <span className="text-foreground/70">
                          Personalized debt payoff strategies
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-2"></span>
                        <span className="text-foreground/70">
                          Interest savings calculations
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-2"></span>
                        <span className="text-foreground/70">
                          Progress tracking and milestones
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-2"></span>
                        <span className="text-foreground/70">
                          Smart refinancing recommendations
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <button
                        className="bg-accent/10 text-accent py-2 px-6 text-sm rounded-md font-medium hover:bg-accent/20 transition-all duration-300 flex items-center"
                        onClick={() => setShowNotifyPopover(true)}
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M21.697 16.468c-.02-.016-2.14-1.64-2.103-6.03.02-2.532-.812-4.782-2.347-6.335C15.872 2.71 14.01 1.94 12.005 1.93h-.013c-2.004.01-3.866.78-5.242 2.174-1.534 1.553-2.368 3.802-2.346 6.334.037 4.33-2.02 5.967-2.102 6.03-.26.193-.366.53-.265.838.102.308.39.515.712.515h4.92c.102 2.31 1.997 4.16 4.33 4.16s4.226-1.85 4.327-4.16h4.922c.322 0 .61-.206.71-.514.103-.307-.003-.645-.263-.838zM12 20.478c-1.505 0-2.73-1.177-2.828-2.658h5.656c-.1 1.48-1.323 2.66-2.828 2.66zM4.38 16.32c.74-1.132 1.548-3.028 1.524-5.896-.018-2.16.644-3.982 1.913-5.267C8.91 4.05 10.397 3.437 12 3.43c1.603.008 3.087.62 4.18 1.728 1.27 1.285 1.933 3.106 1.915 5.267-.024 2.868.785 4.765 1.525 5.896H4.38z" />
                        </svg>
                        Get notified
                      </button>
                      <a
                        href="#"
                        className="text-accent hover:text-accent/80 text-sm font-medium flex items-center"
                      >
                        Preview features
                        <svg
                          className="w-4 h-4 ml-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Future Apps */}
            <div>
              <div className="flex items-center justify-center mb-12">
                <span className="px-4 py-1 rounded-full bg-foreground/10 text-foreground/70 text-sm font-medium">
                  Future Roadmap - 2025-2026
                </span>
              </div>

              <motion.div
                className="grid md:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.div
                  className="bg-dashboard-card rounded-lg shadow-md p-6 text-foreground group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  variants={fadeIn}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <PiggyBank className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-bold mb-3">Budget Planner</h4>
                    <p className="text-foreground/70 mb-4">
                      Create and maintain personalized budgets with smart
                      categorization and AI-powered insights to optimize your
                      spending habits.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary text-xs font-medium">
                        Coming Q3 2025
                      </span>
                      <button
                        className="text-xs text-foreground/60 hover:text-primary"
                        onClick={() => setShowNotifyPopover(true)}
                      >
                        Get notified
                      </button>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-dashboard-card rounded-lg shadow-md p-6 text-foreground group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  variants={fadeIn}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <ChartSpline className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-bold mb-3">
                      Investment Tracker
                    </h4>
                    <p className="text-foreground/70 mb-4">
                      Monitor your investments across multiple platforms with
                      comprehensive analytics, performance tracking, and tax
                      optimization tools.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary text-xs font-medium">
                        Coming Q4 2025
                      </span>
                      <button
                        className="text-xs text-foreground/60 hover:text-primary"
                        onClick={() => setShowNotifyPopover(true)}
                      >
                        Get notified
                      </button>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-dashboard-card rounded-lg shadow-md p-6 text-foreground group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  variants={fadeIn}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <ChartColumn className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-bold mb-3">Expense Analyzer</h4>
                    <p className="text-foreground/70 mb-4">
                      Gain deep insights into your spending habits with
                      AI-powered categorization, trend analysis, and
                      personalized recommendations for saving.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary text-xs font-medium">
                        Coming Q1 2026
                      </span>
                      <button
                        className="text-xs text-foreground/60 hover:text-primary"
                        onClick={() => setShowNotifyPopover(true)}
                      >
                        Get notified
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - New */}
        <section className="py-16 bg-dashboard-card/30 relative">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl -z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
                What Our <span className="text-primary">Users</span> Say
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  className="bg-dashboard-card p-6 rounded-lg shadow-md border border-primary/10"
                  variants={slideIn}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-4 italic text-sm">
                    "The subscription tracker has saved me over $200 in the
                    first month alone by helping me identify subscriptions I'd
                    forgotten about. The interface is clean and it's incredibly
                    easy to use."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 mr-3 flex items-center justify-center">
                      <span className="text-primary font-bold">JK</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Jason K.</h4>
                      <p className="text-foreground/60 text-xs">
                        Premium User - 8 months
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-dashboard-card p-6 rounded-lg shadow-md border border-primary/10"
                  variants={slideIn}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-4 italic text-sm">
                    "I love the renewal reminders! No more surprise charges when
                    free trials end. The dashboard gives me perfect visibility
                    into my monthly recurring expenses."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 mr-3 flex items-center justify-center">
                      <span className="text-primary font-bold">RL</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Rachel L.</h4>
                      <p className="text-foreground/60 text-xs">
                        Basic User - 1 year
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-dashboard-card p-6 rounded-lg shadow-md border border-primary/10"
                  variants={slideIn}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-4 italic text-sm">
                    "Customer service is exceptional! When I reported a bug,
                    they fixed it within 24 hours. The team clearly cares about
                    user experience and is constantly improving the app."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 mr-3 flex items-center justify-center">
                      <span className="text-primary font-bold">MT</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Mark T.</h4>
                      <p className="text-foreground/60 text-xs">
                        Premium User - 6 months
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="flex justify-center mt-12">
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 flex items-center text-sm font-medium"
                >
                  Read more testimonials
                  <svg
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Vision Section */}
        <section className="py-16 bg-dashboard relative">
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl -z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Our <span className="text-primary">Vision</span> for the Future
              </h2>

              <div className="bg-dashboard-card/50 backdrop-blur-sm p-8 rounded-lg shadow-md border border-primary/10">
                <div className="md:flex items-center gap-10">
                  <div className="md:w-1/2 mb-6 md:mb-0  ">
                    <img
                      src="/assets/logoicon.png"
                      alt="Pace Innovation vision"
                      className="relative w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-lg shadow-xl z-10"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <div className="space-y-4">
                      <p className="text-base leading-relaxed">
                        At Pace Innovation, we envision a world where everyone
                        has access to powerful yet simple tools for financial
                        wellness, regardless of their financial literacy level
                        or starting point.
                      </p>
                      <p className="text-base leading-relaxed">
                        We're building a comprehensive ecosystem of specialized
                        finance applications that work seamlessly together,
                        allowing you to customize your financial management
                        approach while maintaining a holistic view of your
                        financial health.
                      </p>
                      <p className="text-base leading-relaxed">
                        By 2027, we aim to provide solutions for every aspect of
                        personal finance, from daily expense tracking to
                        long-term wealth building, all connected through our
                        secure and intelligent financial hub.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
                  <button
                    className="w-full md:w-auto bg-primary text-primary-foreground py-3 px-8 text-sm rounded-md font-medium hover:bg-primary/90 transition-all duration-300 shadow-md shadow-primary/10"
                    onClick={() => setShowNotifyPopover(true)}
                  >
                    Join Our Journey
                  </button>
                  <a
                    href="#"
                    className="text-foreground/70 hover:text-primary text-sm font-medium flex items-center"
                  >
                    Read our full mission statement
                    <svg
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section - New */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5 relative">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto bg-dashboard-card p-8 md:p-12 rounded-xl shadow-lg border border-primary/10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="md:flex gap-8 items-center">
                <div className="md:w-1/2 mb-6 md:mb-0">
                  <div className="inline-block bg-primary/10 px-3 py-1 rounded-full text-primary text-xs font-medium mb-4">
                    STAY UPDATED
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Join Our Financial Wellness Newsletter
                  </h3>
                  <p className="text-foreground/70 mb-6">
                    Subscribe to receive updates on our latest apps, exclusive
                    financial tips, and early access to beta features. We send
                    valuable content, not spam.
                  </p>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <svg
                          className="w-4 h-4 text-primary"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">
                        Monthly financial tips & tricks
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <svg
                          className="w-4 h-4 text-primary"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">
                        Early access to new features
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <svg
                          className="w-4 h-4 text-primary"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">
                        Exclusive subscriber discounts
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2">
                  <form className="bg-dashboard p-6 rounded-lg border border-foreground/10">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-dashboard-card border border-foreground/20 rounded-md focus:outline-none focus:border-primary"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 bg-dashboard-card border border-foreground/20 rounded-md focus:outline-none focus:border-primary"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-primary"
                        id="agree"
                      />
                      <label
                        htmlFor="agree"
                        className="ml-2 text-xs text-foreground/70"
                      >
                        I agree to receive occasional emails from Pace
                        Innovation
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md font-medium hover:bg-primary/90 transition-all duration-300"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowNotifyPopover(true);
                      }}
                    >
                      Subscribe to Newsletter
                    </button>
                    <p className="text-xs text-foreground/60 mt-3 text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Enhanced Email Notification Popover */}
      {showNotifyPopover && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            className="bg-dashboard-card rounded-lg shadow-xl p-8 max-w-md w-full mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-primary">Stay Connected</h3>
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
              <div className="text-center py-6">
                <div className="text-accent mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto"
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
                <h4 className="font-medium text-xl mb-2">
                  You're on the list!
                </h4>
                <p className="text-foreground/70 mb-4">
                  Thanks for subscribing! We'll keep you updated on all our
                  latest apps and features.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowNotifyPopover(false)}
                    className="bg-primary/10 text-primary py-2 px-6 rounded-md text-sm font-medium hover:bg-primary/20 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-foreground/70 mb-6">
                  Join our community of financial enthusiasts and be the first
                  to know about our latest apps, updates, and exclusive tips to
                  improve your financial health.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-dashboard border border-foreground/20 rounded-md focus:outline-none focus:border-accent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="flex items-start mb-6">
                    <input
                      type="checkbox"
                      id="consent"
                      className="h-4 w-4 accent-accent mt-1"
                      required
                    />
                    <label
                      htmlFor="consent"
                      className="ml-2 text-sm text-foreground/70"
                    >
                      I agree to receive notifications about product updates,
                      new features, and occasional financial tips from Pace
                      Innovation. You can unsubscribe at any time.
                    </label>
                  </div>
                  {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm">
                      {error}
                    </div>
                  )}
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="px-6 py-3 text-sm border border-foreground/20 rounded-md hover:bg-dashboard-card"
                      onClick={() => setShowNotifyPopover(false)}
                      disabled={isLoading}
                    >
                      Maybe later
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 text-sm bg-accent text-accent-foreground rounded-md hover:bg-accent/90 disabled:opacity-70 flex items-center shadow-md shadow-accent/10"
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