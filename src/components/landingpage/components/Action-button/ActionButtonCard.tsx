import { cn } from "@/utils/utils";
import { ActionButtonHeading } from "./ActionButtonHeading";
import { ActionButtonDescription } from "./ActionButtonDescription";
import { ActionButtonCTA } from "./ActionButtonCTA";
import { ActionButtonImage } from "./ActionButtonImage";
import { useState } from "react";
  
export const ActionButtonCard = () => {
    const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className={cn(
        "relative rounded-xl overflow-hidden",
        "transition-all duration-500 ease-in-out",
        "mx-4 sm:mx-6 lg:mx-auto",
        "py-10 md:py-14 lg:py-16 xl:py-20",
        "max-w-7xl",
        "border border-transparent",
        isHovered
          ? "shadow-2xl border-opacity-30 border-blue-400 transform translate-y-1"
          : "shadow-lg"
      )}
      style={{
        background: `
          linear-gradient(
            135deg,
            rgba(32, 0, 121, 0.05),
            rgba(6, 44, 95, 0.35)
          )
        `,
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        {/* Responsive container padding */}
        <div className="grid gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-center grid-cols-1 lg:grid-cols-2">
          {/* Content Section */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 xl:space-y-8">
            <ActionButtonHeading className="text-left" />
            <ActionButtonDescription className="text-left max-w-[600px] lg:max-w-none" />
            <ActionButtonCTA className="w-full sm:w-auto" />
          </div>

          {/* Image Section */}
          <div className="relative order-first lg:order-last">
            {" "}
            {/* Mobile-first image ordering */}
            <ActionButtonImage
              className={cn(
                "w-full h-auto",
                "transition-transform duration-300 hover:scale-105",
                "max-w-[500px] lg:max-w-none mx-auto" // Constrain image size
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
