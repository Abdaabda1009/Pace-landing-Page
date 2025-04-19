import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Check,
  ArrowRight,
  Shield,
  Clock,
  CreditCard,
} from "lucide-react";
import { useState } from "react";

export const PricingSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Categorized features for better organization
  const features = {
    core: [
      {
        icon: <Check className="flex-shrink-0 w-5 h-5 text-green-400" />,
        text: "Real-time budget tracking",
      },
      {
        icon: <Check className="flex-shrink-0 w-5 h-5 text-green-400" />,
        text: "Smart savings goals",
      },
      {
        icon: <Check className="flex-shrink-0 w-5 h-5 text-green-400" />,
        text: "Subscription management",
      },
    ],
    advanced: [
      {
        icon: <Sparkles className="flex-shrink-0 w-5 h-5 text-purple-400" />,
        text: "Debt reduction plans",
      },
      {
        icon: <Sparkles className="flex-shrink-0 w-5 h-5 text-purple-400" />,
        text: "Financial analytics",
      },
      {
        icon: <Sparkles className="flex-shrink-0 w-5 h-5 text-purple-400" />,
        text: "Cross-device sync",
      },
    ],
    premium: [
      {
        icon: <Shield className="flex-shrink-0 w-5 h-5 text-blue-400" />,
        text: "Premium support",
      },
      {
        icon: <Shield className="flex-shrink-0 w-5 h-5 text-blue-400" />,
        text: "Custom reports",
      },
      {
        icon: <Shield className="flex-shrink-0 w-5 h-5 text-blue-400" />,
        text: "Data encryption",
      },
    ],
  };

  const handleGetStarted = () => {
    // Smooth scroll to sign up form or navigate to registration
    navigate("/signup");
  };

  return (
    <div
      id="pricing-section"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl"
    >
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="container px-4 mx-auto text-center sm:px-6 lg:px-8 relative z-10">
        {/* Badge with subtle animation */}
        <div className="flex flex-col items-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 transition-all duration-300 transform rounded-full bg-blue-500/20 hover:bg-blue-500/30 hover:scale-105 cursor-pointer group">
            <Sparkles className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
            <span className="text-sm font-semibold text-blue-100 group-hover:text-white">
              Unlock Premium Features
            </span>
          </div>
        </div>

        {/* Enhanced heading with better typographic hierarchy */}
        <div className="max-w-3xl mx-auto mb-16 space-y-6">
          <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            Simple Pricing,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              Maximum Value
            </span>
          </h2>
          <p className="text-xl text-gray-300 sm:text-2xl max-w-2xl mx-auto">
            Start free. Upgrade anytime. No hidden fees or commitments.
          </p>
        </div>

        {/* Enhanced pricing card with interaction states */}
        <div
          className="relative max-w-2xl mx-auto mb-16 overflow-hidden rounded-2xl bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 transition-all duration-500 shadow-lg hover:shadow-blue-500/20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transform: isHovered ? "translateY(-8px)" : "translateY(0)",
            borderColor: isHovered
              ? "rgba(59, 130, 246, 0.5)"
              : "rgba(55, 65, 81, 0.5)",
            boxShadow: isHovered
              ? "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)"
              : "none",
          }}
        >
          {/* Popular badge */}
          <div className="absolute top-0 right-0">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
              MOST POPULAR
            </div>
          </div>

          <div className="p-8 sm:p-12">
            <div className="flex flex-col items-center justify-center gap-2 mb-12">
              <span className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                $0
              </span>
              <span className="text-lg text-gray-400">/month forever</span>
              <p className="mt-2 text-gray-300 max-w-md">
                Everything you need to take control of your finances
              </p>
            </div>

            {/* Organized features with categories */}
            <div className="mb-12">
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-blue-300 mb-4">
                  Core Features
                </h3>
                <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-3">
                  {features.core.map((feature, index) => (
                    <div
                      key={`core-${index}`}
                      className="flex items-start p-3 space-x-3 rounded-lg hover:bg-gray-700/30 transition-colors"
                    >
                      {feature.icon}
                      <span className="text-left text-gray-200">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">
                  Advanced Tools
                </h3>
                <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-3">
                  {features.advanced.map((feature, index) => (
                    <div
                      key={`adv-${index}`}
                      className="flex items-start p-3 space-x-3 rounded-lg hover:bg-gray-700/30 transition-colors"
                    >
                      {feature.icon}
                      <span className="text-left text-gray-200">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-300 mb-4">
                  Premium Benefits
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {features.premium.map((feature, index) => (
                    <div
                      key={`prem-${index}`}
                      className="flex items-start p-3 space-x-3 rounded-lg hover:bg-gray-700/30 transition-colors"
                    >
                      {feature.icon}
                      <span className="text-left text-gray-200">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced CTA Button with animation */}
            <Button
              onClick={handleGetStarted}
              className={`w-full py-6 text-lg font-semibold text-white transition-all duration-500 border-2 rounded-xl group relative overflow-hidden ${
                isHovered
                  ? "border-blue-400 bg-gradient-to-r from-blue-600/40 to-purple-600/40"
                  : "border-blue-600/50 bg-transparent"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started Free Today
                <ArrowRight
                  className={`w-5 h-5 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                />
              </span>
              <span
                className={`absolute inset-0 bg-gradient-to-r from-blue-600/60 to-purple-600/60 transform transition-transform duration-500 ${isHovered ? "scale-x-100" : "scale-x-0"} origin-left`}
              ></span>
            </Button>
          </div>
        </div>

        {/* Enhanced trust indicators */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-6 mb-6 flex-wrap">
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">30-day premium trial</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <CreditCard className="w-4 h-4" />
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-4 h-4" />
              <span className="text-sm">SSL secured connection</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Join over 600 users who have transformed their financial
            management with our platform
          </p>
        </div>
      </div>
    </div>
  );
};
