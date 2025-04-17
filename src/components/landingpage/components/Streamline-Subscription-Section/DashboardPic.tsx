import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Play, ExternalLink, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export const DashboardPic = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Card data
  const cards = [
    {
      id: "overview",
      title: "Subscription Overview",
      description:
        "View and manage all your subscriptions in one powerful dashboard",
      image: "/LandingAssets/Sub-view-1.png",
      hasVideo: true,
      color: "from-blue-500/20 to-purple-600/20",
      borderColor: "border-blue-500/30 group-hover:border-blue-400/50",
    },
    {
      id: "reminders",
      title: "Smart Reminders",
      description:
        "Never miss a payment with intelligent alerts and renewal tracking",
      image: "/LandingAssets/Reminder-2.png",
      hasVideo: false,
      color: "from-purple-500/20 to-blue-600/20",
      borderColor: "border-blue-600/30 group-hover:border-purple-400/50",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          variants={cardVariants}
          className={`relative ${
            index === 0 ? "lg:col-span-1" : "lg:col-span-1"
          }`}
          onMouseEnter={() => setHoveredCard(card.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl transform -translate-y-1 scale-[0.98] group-hover:scale-[1.01] transition-all duration-500" />

          <Card
            className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-r ${card.color} backdrop-blur-sm border-2 border-blue-500/20 hover:border-blue-400/40 group transition-all duration-500 h-full transform hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-900/10`}
          >
            {/* Badge in corner */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full border border-white/10 text-xs font-medium text-blue-200">
              Featured
            </div>

            {/* Image container */}
            <div className="relative h-52 sm:h-64 lg:h-72 w-full overflow-hidden rounded-t-lg">
              {/* Glowing overlay effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${
                  card.hasVideo
                    ? "from-black/80 via-transparent to-transparent"
                    : "from-black/60 via-transparent to-transparent"
                } opacity-70`}
              />

              {/* Image */}
              <motion.img
                className={`w-full h-full object-fit transition-transform duration-[3s] group-hover:scale-110 ${card.borderColor}`}
                src={card.image}
                alt={card.title}
                initial={{ scale: 1 }}
                animate={{
                  scale: hoveredCard === card.id ? 1.05 : 1,
                }}
                transition={{
                  duration: 8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              {/* Video play button */}
              {card.hasVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-8 h-8 text-white stroke-[1.5]" />
                  </motion.button>
                </div>
              )}
            </div>

            {/* Content section */}
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-white font-semibold text-xl tracking-tight">
                  {card.title}
                </h3>

                <motion.div
                  className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  New
                </motion.div>
              </div>

              <p className="text-gray-300/90 text-sm leading-relaxed">
                {card.description}
              </p>

              {/* Interactive footer */}
              <div className="pt-3 flex justify-between items-center">
                <motion.button
                  className="flex items-center text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
                  whileHover={{ x: 3 }}
                >
                  Learn more <ChevronRight className="ml-1 w-4 h-4" />
                </motion.button>

                <motion.button
                  className="p-2 rounded-full bg-blue-900/40 border border-blue-700/30 text-blue-300 hover:bg-blue-800/50 hover:border-blue-600/40 transition-all"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
