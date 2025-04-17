import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Star, CheckCircle } from "lucide-react";

export const MobileAppSection = () => {
  const sectionRef = useRef(null);
  const topPhoneRef = useRef(null);
  const bottomPhoneRef = useRef(null);

  const isTopPhoneInView = useInView(topPhoneRef, {
    once: false,
    margin: "-100px",
  });
  const isBottomPhoneInView = useInView(bottomPhoneRef, {
    once: false,
    margin: "-100px",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacitySection = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.6, 1, 1, 0.6]
  );

  const features = [
    { id: 1, text: "Real-time notifications" },
    { id: 2, text: "Secure data encryption" },
    { id: 3, text: "Offline mode available" },
  ];

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: opacitySection }}
      className="py-20 md:py-32 mt-20 rounded-[20px] relative overflow-hidden border border-blue-600/20 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-800/5 via-transparent to-transparent opacity-80" />
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vh] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[30vw] h-[30vh] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent blur-2xl" />
        <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-blue-950/30 to-transparent" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* App info badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-600/30 backdrop-blur-sm">
            <Download className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">
              Mobile App Available
            </span>
          </div>
        </motion.div>

        {/* Top Section */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20 mb-32 md:mb-40">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6 md:space-y-8"
          >
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-700/30 mt-8">
              <div className="flex -space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-blue-800/50 border border-blue-700 flex items-center justify-center text-[10px] text-blue-300"
                  >
                    <Star className="w-3 h-3" />
                  </div>
                ))}
              </div>
              <span className="text-xs font-medium text-blue-300 ml-1">
                3.6 App Store Rating
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight md:leading-[1.2]">
              Comprehensive
              <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                {" "}
                Subscription{" "}
              </span>
              Overview
            </h2>

            <p className="text-gray-300/90 text-lg leading-relaxed max-w-2xl">
              Get a clear, detailed snapshot of all your active subscriptions in
              one place. Easily track billing cycles, monitor recurring
              payments, and gain valuable insights into your spending habits.
            </p>

            <div className="space-y-3 pt-2">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                className="px-6 py-6 text-base bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-0 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-900/30"
                size="lg"
              >
                <span className="flex items-center gap-2">
                  Download App
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>

              <Button
                variant="outline"
                className="px-6 py-6 text-base bg-blue-900/20 border-2 border-blue-700/40 text-blue-300 hover:bg-blue-800/30 hover:border-blue-600/50 rounded-xl hover:scale-105 transition-all duration-300"
                size="lg"
              >
                Learn more
              </Button>
            </div>
          </motion.div>

          <motion.div
            ref={topPhoneRef}
            className="flex-1 flex justify-center md:justify-end relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Phone frame glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-[50px] filter blur-xl opacity-70 animate-pulse" />

              {/* Actual phone mockup */}
              <div
                className={`w-[280px] h-[580px] md:w-[320px] md:h-[640px] relative overflow-hidden rounded-[40px] border-8 border-gray-800 shadow-2xl transition-all duration-700 ${
                  isTopPhoneInView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-70"
                }`}
              >
                <img
                  src="/LandingAssets/Mock1.png"
                  alt="Subscription overview interface"
                  className="w-full h-full object-cover absolute inset-0"
                  loading="lazy"
                />

                {/* Screen overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />

                {/* Screen reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />

                {/* Device notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl" />
              </div>

              {/* App store badges */}
              <div className="absolute -bottom-16 gap-24 items-center justify-center left-1/2 transform -translate-x-1/2 flex gap-3">
                <img
                  src="/LandingAssets/app-store.png"
                  alt="App Store"
                  className="h-10 w-auto hover:opacity-80 transition-opacity cursor-pointer"
                />
                <span>App Store</span>
                <img
                  src="/LandingAssets/Google-logo.png"
                  alt="Google Play"
                  className="h-10 w-auto hover:opacity-80 transition-opacity cursor-pointer"
                />
                <span>Google Play</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6 md:space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-700/30 mb-2">
              <span className="text-xs font-medium text-blue-300">
                Premium Feature
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight md:leading-[1.2]">
              <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                Subscription{" "}
              </span>
              Insights & Analysis
            </h2>

            <p className="text-gray-300/90 text-lg leading-relaxed max-w-2xl">
              Dive deep into the specifics of each subscription with powerful
              analytics. Discover detailed billing cycles, payment history, and
              usage patterns—all designed to give you complete control over your
              recurring services.
            </p>

            <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Monthly spending</span>
                  <span className="text-blue-300 font-semibold">$149.95</span>
                </div>
                <div className="w-full bg-blue-900/40 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>$0</span>
                  <span>$200</span>
                </div>
              </div>
            </div>

            <Button
              className="px-6 py-6 text-base flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-0 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-900/30 w-full md:w-auto"
              size="lg"
            >
              Explore Features <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div
            ref={bottomPhoneRef}
            className="flex-1 flex justify-center md:justify-start relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Phone frame glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 rounded-[50px] filter blur-xl opacity-70 animate-pulse" />

              {/* Actual phone mockup */}
              <div
                className={`w-[280px] h-[580px] md:w-[320px] md:h-[640px] relative overflow-hidden rounded-[40px] border-8 border-gray-800 shadow-2xl transition-all duration-700 ${
                  isBottomPhoneInView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-70"
                }`}
              >
                <img
                  src="/LandingAssets/Mock2.png"
                  alt="Subscription details interface"
                  className="w-full h-full object-cover absolute inset-0"
                  loading="lazy"
                />

                {/* Screen overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />

                {/* Screen reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />

                {/* Device notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl" />
              </div>

              {/* Feature callouts */}
              <div className="absolute -left-16 top-1/4 bg-blue-900/30 backdrop-blur-sm border border-blue-700/40 px-3 py-2 rounded-lg text-sm text-blue-200 shadow-lg">
                Renewal Tracking
                <div className="absolute w-3 h-3 bg-blue-900/30 border-t border-r border-blue-700/40 transform rotate-45 -right-1.5 top-1/2 -translate-y-1/2"></div>
              </div>

              <div className="absolute -right-20 top-2/3 bg-blue-900/30 backdrop-blur-sm border border-blue-700/40 px-3 py-2 rounded-lg text-sm text-blue-200 shadow-lg">
                Usage Analytics
                <div className="absolute w-3 h-3 bg-blue-900/30 border-b border-l border-blue-700/40 transform rotate-45 -left-1.5 top-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-32 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to streamline your subscriptions?
          </h3>
          <p className="text-gray-300 mb-8">
            Download our app today and take control of your recurring expenses.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              className="px-8 py-6 text-base bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-0 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-900/30"
              size="lg"
            >
              <span className="flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
