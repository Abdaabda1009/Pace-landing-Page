import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  PieChart,
  Calendar,
  CreditCard,
  Bell,
} from "lucide-react";
import { DashboardPic } from "./DashboardPic";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { cn } from "@/utils/utils";
import { useNavigate } from "react-router-dom";


// Feature card component for the benefits section
const FeatureItem = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true, margin: "-50px" }}
    className="flex flex-col items-start p-5 rounded-xl bg-blue-900/20 border border-blue-700/30 backdrop-blur-sm hover:bg-blue-800/20 hover:border-blue-600/40 transition-all duration-300"
  >
    <div className="rounded-lg p-3 bg-blue-500/20 mb-4">
      <Icon className="w-5 h-5 text-blue-400" />
    </div>
    <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </motion.div>
);

// Stats counter with animation
const AnimatedCounter = ({ value, label, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.toString().replace(/,/g, ""));
      const duration = 2000;
      const increment = Math.ceil(end / (duration / 16));

      const timer = setInterval(() => {
        start += increment;
        if (start > end) start = end;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={counterRef} className="flex flex-col items-center">
      <p className="text-3xl md:text-4xl font-bold text-blue-300">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
    </div>
  );
};

export const AboutSection = () => {

  // Navigation Implementaion 
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/Signup")
  }


  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.4, 1, 1, 0.4]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.95]
  );

  const features = [
    {
      icon: PieChart,
      title: "Expense Insights",
      description:
        "Get visual breakdowns of your subscription spending with detailed analytics.",
      delay: 0.1,
    },
    {
      icon: Calendar,
      title: "Payment Calendar",
      description: "See all upcoming payments in one organized calendar view.",
      delay: 0.2,
    },
    {
      icon: CreditCard,
      title: "Subscription Manager",
      description:
        "Track, pause, and cancel subscriptions from a single dashboard.",
      delay: 0.3,
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description:
        "Receive timely notifications before payments to avoid surprises.",
      delay: 0.4,
    },
  ];

  return (
    <section
      id="company-section"
      className="relative overflow-hidden py-16 md:py-24 border-b md:border-blue-600/20"
      ref={containerRef}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl" />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12 2xl:px-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-10">
            {/* Our Products Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-sm font-medium text-blue-300">
                Our Products
              </span>
            </motion.div>

            {/* Heading */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold leading-tight text-white"
              >
                Streamline Your{" "}
                <span className="relative">
                  <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                    Subscriptions
                  </span>
                  <motion.span
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-blue-500 to-blue-300/0"
                  />
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-gray-300 mt-6 leading-relaxed"
              >
                Managing multiple subscriptions doesn't have to be complicated.
                Our platform unifies all your recurring payments into one
                intuitive dashboard, providing detailed analytics, timely
                alerts, and effortless management.
              </motion.p>
            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-6 py-8 px-6 rounded-xl bg-blue-900/20 border border-blue-800/30 backdrop-blur-sm"
            >
              <AnimatedCounter value="90" suffix="%" label="Average Savings" />
              <AnimatedCounter value="600" prefix="+" label="Active Users" />
              <AnimatedCounter value="80" suffix="%" label="Satisfaction" />
            </motion.div>

            {/* Feature Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <FeatureItem key={index} {...feature} />
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 items-center"
            >
              <Button
                className="group h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-0 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 hover:scale-[1.02]"
                aria-label="Get started with our platform"
                onClick={handleNavigation}
              >
                <span className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>

              <Button
                variant="outline"
                className="group h-12 px-8 bg-transparent border border-blue-600/40 text-blue-300 hover:bg-blue-900/30 hover:border-blue-500/60 font-medium rounded-lg transition-all duration-300"
                aria-label="Learn more about our platform"
              >
                Learn More
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-600/20 to-transparent rounded-3xl filter blur-2xl transform scale-95 translate-y-4" />

            <div className="relative p-2 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 shadow-xl shadow-blue-900/20">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-1 p-1 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-700">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>

              <div className="overflow-hidden rounded-xl">
                <DashboardPic />
              </div>

              <div className="absolute -bottom-4 -right-4 bg-blue-600/90 text-white text-xs font-medium px-4 py-2 rounded-full backdrop-blur-sm border border-blue-500/50 shadow-lg shadow-blue-900/30">
                Live Demo Available →
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
