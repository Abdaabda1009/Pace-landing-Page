import { useState } from "react";
import { NewsletterSection } from "./NewsletterSection";
import { BrandSection } from "./BrandSection";
import { FooterLinks } from "./FooterLinks";
import { ContactSection } from "./ContactSection";
import { Copyright } from "./Copyright";
import { ArrowUpRight, ChevronUp, ExternalLink } from "lucide-react";

export const Footer = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const serviceLinks = [
    { to: "/Product", label: "Product" },
    { to: "/Features", label: "Features" },
    { to: "/blog", label: "Blog" },
    { to: "/Changelog", label: "Changelog" },
    { to: "/Company", label: "Company" },
    { to: "/PrivacyPolicy", label: "Privacy Policy" },
  ];

  const communityLinks = [
    { href: "https://www.reddit.com/r/PACEDebtfree/", label: "Reddit" },
    { href: "https://twitter.com", label: "X" },
    { href: "https://discord.gg/cpCM8jKZ", label: "Discord" },
    {
      href: "https://featuresrequest.slack.com/archives/C088ZV8D3CG",
      label: "Slack",
    },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-16 lg:mt-24 py-12 lg:py-16 rounded-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Newsletter Section */}
        <div className="rounded-lg shadow-sm">
          <NewsletterSection />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 mt-12">
          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <BrandSection />
          </div>

          {/* Service Links */}
          <div>
            <div className="mb-6">
              <button
                onClick={() => toggleSection("service")}
                className="flex items-center justify-between w-full text-left md:cursor-default"
              >
                <h3 className="text-lg font-semibold text-white dark:text-white">
                  Service
                </h3>
                <ChevronUp
                  className={`w-5 h-5 md:hidden transition-transform duration-300 ${expandedSection === "service" ? "rotate-0" : "rotate-180"}`}
                />
              </button>

              <div
                className={`mt-4 space-y-3 ${expandedSection === "service" ? "block" : "hidden md:block"}`}
              >
                {serviceLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.to}
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Community Links */}
          <div>
            <div className="mb-6">
              <button
                onClick={() => toggleSection("community")}
                className="flex items-center justify-between w-full text-left md:cursor-default"
              >
                <h3 className="text-lg font-semibold text-white dark:text-white">
                  Community
                </h3>
                <ChevronUp
                  className={`w-5 h-5 md:hidden transition-transform duration-300 ${expandedSection === "community" ? "rotate-0" : "rotate-180"}`}
                />
              </button>

              <div
                className={`mt-4 space-y-3 ${expandedSection === "community" ? "block" : "hidden md:block"}`}
              >
                {communityLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <div className="mb-6">
              <button
                onClick={() => toggleSection("contact")}
                className="flex items-center justify-between w-full text-left md:cursor-default"
              >
                <h3 className="text-lg font-semibold text-white dark:text-white">
                  Contact
                </h3>
                <ChevronUp
                  className={`w-5 h-5 md:hidden transition-transform duration-300 ${expandedSection === "contact" ? "rotate-0" : "rotate-180"}`}
                />
              </button>

              <div
                className={`mt-4 ${expandedSection === "contact" ? "block" : "hidden md:block"}`}
              >
                <ContactSection />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>

        {/* Enhanced Copyright Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Copyright />

          {/* Back to top link */}
          <a
            href="#top"
            className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center gap-1 text-sm"
          >
            Back to top
            <ChevronUp className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
