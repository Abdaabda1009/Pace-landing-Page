import { LandingNavbar } from "@/components/landingpage/components/Navbar/LandingNavbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState, useRef, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  X,
  Tag,
  Clock,
  Search,
  ChevronLeft,
  Share2,
  BookmarkPlus,
  Calendar,
  Eye,
} from "lucide-react";
import { Footer } from "../components/footer/Footer";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const articles = [
  {
    id: 1,
    category: "Wealth Management",
    date: "Jan 24, 2024",
    title: "Smart Budgeting Strategies for Long-term Financial Success",
    image: "/BlogAssets/Smart-Budgeting-Strategies.png",
    readTime: "5 min read",
    excerpt:
      "Learn effective budgeting techniques that can help secure your financial future and build lasting wealth.",
    content: `
    <h2>Strategic Financial Planning</h2>
    <p>Effective wealth management requires a disciplined approach to budgeting. Key components include:</p>
    <ul>
      <li>Automated savings plans</li>
      <li>Tax optimization strategies</li>
      <li>Diversified investment portfolios</li>
    </ul>
    
    <h3>Market Analysis</h3>
    <p>Current market indicators show:</p>
    <table>
      <tr><th>Index</th><th>YTD Growth</th></tr>
      <tr><td>S&P 500</td><td>8.24%</td></tr>
      <tr><td>Gold</td><td>2.15%</td></tr>
      <tr><td>10-Yr Treasury</td><td>4.32%</td></tr>
    </table>
  `,
    seoKeywords: [
      "wealth management",
      "financial planning",
      "investment strategies",
    ],
  },

  {
    id: 2,
    category: "Investing",
    date: "Feb 1, 2025",
    title: "Navigating Market Volatility: Sector Rotation Strategies",
    image: "/BlogAssets/Market-Volatility-Strategies.png",
    readTime: "7 min read",
    excerpt:
      "Discover how to protect and grow your portfolio during turbulent market conditions with strategic sector rotation.",
    content: `
    <h2>Cyclical vs Defensive Assets</h2>
    <p>2024 market conditions favor:</p>
    <ul>
      <li>Technology sector growth stocks</li>
      <li>Consumer staples ETFs</li>
      <li>Utility company bonds</li>
    </ul>

    <h3>Performance Metrics</h3>
    <table>
      <tr><th>Asset Class</th><th>30-Day Volatility</th></tr>
      <tr><td>Tech Stocks</td><td>18.7%</td></tr>
      <tr><td>REITs</td><td>12.4%</td></tr>
      <tr><td>Corporate Bonds</td><td>6.9%</td></tr>
    </table>
  `,
    seoKeywords: [
      "market volatility",
      "sector rotation",
      "investment strategies",
    ],
  },

  {
    id: 3,
    category: "Retirement Planning",
    date: "Feb 8, 2025",
    title: "Roth vs Traditional IRA: Decoding Tax Implications",
    image: "/BlogAssets/IRA-Comparison-Guide.png",
    readTime: "6 min read",
    excerpt:
      "Compare the tax advantages of different retirement accounts to optimize your long-term savings strategy.",
    content: `
    <h2>Long-Term Tax Considerations</h2>
    <ul>
      <li>Roth IRA withdrawal tax benefits</li>
      <li>Traditional IRA contribution deductions</li>
      <li>Required Minimum Distribution (RMD) rules</li>
    </ul>

    <h3>2024 Contribution Limits</h3>
    <table>
      <tr><th>Account Type</th><th>Under 50</th><th>50+</th></tr>
      <tr><td>Roth IRA</td><td>$7,000</td><td>$8,000</td></tr>
      <tr><td>Traditional IRA</td><td>$7,000</td><td>$8,000</td></tr>
    </table>
  `,
    seoKeywords: ["retirement planning", "IRA comparison", "tax optimization"],
  },

  {
    id: 4,
    category: "Tax Strategies",
    date: "Jan 27, 2024",
    title: "Maximizing Deductions: Tips for Reducing Your Tax Liability",
    image: "/BlogAssets/Maximizing-Deductions.png",
    readTime: "8 min read",
    excerpt:
      "Learn how to legally minimize your tax burden through strategic planning and available deductions.",
    content: `
    <h2>Tax Planning Strategies</h2>
    <p>Understanding tax laws and taking advantage of deductions can significantly reduce your tax liability. Here are some key strategies:</p>
    <ul>
      <li>Mortgage interest deductions</li>
      <li>Charitable donations</li>
      <li>Business expense deductions</li>
    </ul>

    <h3>Tax Reform Update</h3>
    <p>The latest tax reform changes have brought new opportunities for tax savings. Key takeaways include:</p>
    <table>
      <tr><th>Update</th><th>Impact</th></tr>
      <tr><td>Increased standard deduction</td><td>Reduced taxable income</td></tr>
      <tr><td>Improved business expense deductions</td><td>Increased deductions for small business owners</td></tr>
      <tr><td>Extension of mortgage interest deductions</td><td>Preservation of mortgage interest deductions for homeowners</td></tr>
    </table>
    `,
    seoKeywords: ["tax strategies", "tax planning", "deductions"],
  },
  {
    id: 6,
    category: "Wealth Management",
    date: "Mar 15, 2025",
    title: "Maximizing Your 401(k) Contributions: A Guide to Long-term Wealth",
    image: "/BlogAssets/401k-Contribution-Guide.png",
    readTime: "5 min read",
    excerpt:
      "Make the most of your employer-sponsored retirement plan with these strategic contribution approaches.",
    content: `
    <h2>401(k) Contribution Limits</h2>
    <p>For the 2025 tax year, the maximum 401(k) contribution limit is $20,500. Additionally, if you are 50 or older, you can make catch-up contributions of up to $6,500.</p>

    <h3>Pre-Tax vs Post-Tax Contributions</h3>
    <p>Pre-tax contributions reduce your taxable income, while post-tax contributions are made with after-tax dollars. Consider your individual circumstances to determine the best approach for your 401(k) contributions.</p>
  `,
    seoKeywords: [
      "401(k) contributions",
      "retirement planning",
      "wealth management",
    ],
  },

  {
    id: 7,
    category: "Sustainable Investing",
    date: "Feb 22, 2025",
    title: "Understanding ETFs: A Beginner's Guide to Exchange-Traded Funds",
    image: "/BlogAssets/ETF-Guide.png",
    readTime: "4 min read",
    excerpt:
      "Get started with ETF investing through this comprehensive introduction to exchange-traded funds.",
    content: `
    <h2>What are ETFs?</h2>
    <p>ETFs, or exchange-traded funds, are traded on stock exchanges like individual stocks. They offer diversification and flexibility, making them an attractive option for investors.</p>

    <h3>Types of ETFs</h3>
    <p>There are various types of ETFs, including:</p>
    <ul>
      <li>Equity ETFs</li>
      <li>Bond ETFs</li>
      <li>Currency ETFs</li>
      <li>Commodity ETFs</li>
    </ul>
  `,
    seoKeywords: ["ETFs", "investing", "exchange-traded funds"],
  },
];

const categories = [
  "All Categories",
  "Wealth Management",
  "Investing",
  "Retirement Planning",
  "Tax Strategies",
  "Sustainable Investing",
  "Crypto Markets",
  "Risk Analysis",
];

const Blog = () => {
  const [expandedArticleId, setExpandedArticleId] = useState<number | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [relatedArticles, setRelatedArticles] = useState<typeof articles>([]);

  const handleArticleClick = useCallback((articleId: number) => {
    setExpandedArticleId(articleId);
    // Find related articles with same category
    const clickedArticle = articles.find((article) => article.id === articleId);
    if (clickedArticle) {
      const related = articles
        .filter(
          (article) =>
            article.id !== articleId &&
            (article.category === clickedArticle.category ||
              article.seoKeywords.some((kw) =>
                clickedArticle.seoKeywords.includes(kw)
              ))
        )
        .slice(0, 3);
      setRelatedArticles(related);
    }
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
  }, []);

  const handleCloseArticle = useCallback(() => {
    setExpandedArticleId(null);
    // Re-enable body scrolling
    document.body.style.overflow = "auto";
  }, []);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlayRef.current) handleCloseArticle();
    },
    [handleCloseArticle]
  );

  const handleCategoryClick = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      article.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.seoKeywords.some((keyword) =>
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseArticle();
    };

    if (expandedArticleId !== null) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [expandedArticleId, handleCloseArticle]);

  const currentArticle = expandedArticleId
    ? articles.find((a) => a.id === expandedArticleId)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-dashboard to-dashboard-darker">
      <LandingNavbar />

      {/* Hero Section */}
      <div className="w-full bg-blue-900/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-32 pb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Financial Insights
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Expert analysis, market trends, and strategic advice to help you
            make informed financial decisions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* Search and filter bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div className="relative w-full md:w-72">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors ${
                isSearchFocused ? "text-blue-400" : "text-gray-400"
              }`}
            />
            <Input
              placeholder="Search articles..."
              className="pl-10 bg-white/5 border-white/10 focus:border-blue-500 text-white rounded-lg placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>

          <ScrollArea className="w-full md:w-auto pb-4 md:pb-0">
            <div className="flex space-x-2 px-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "secondary"
                  }
                  size="sm"
                  className={`rounded-full whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Results count */}
        <div className="mb-6 text-white/70">
          Showing {filteredArticles.length}{" "}
          {filteredArticles.length === 1 ? "article" : "articles"}
          {selectedCategory !== "All Categories" && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative ">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Card
                  className="bg-white/5 backdrop-blur-lg border border-white/10 hover:border-blue-400/40 
                hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col"
                  onClick={() => handleArticleClick(article.id)}
                >
                  <div className="overflow-hidden">
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow">
                    <div className="flex items-center gap-3 mb-3 ">
                      <Badge className="bg-blue-600/80 hover:bg-blue-600 text-white ">
                        {article.category}
                      </Badge>
                      <div className="flex items-center text-dashboard-muted text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    <h3 className="text-white text-xl font-semibold mb-2 hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
                    <div className="flex items-center text-sm text-white/60">
                      <Calendar className="h-3 w-3 mr-1" />
                      {article.date}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 p-0"
                    >
                      Read more
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-white/5 p-6 rounded-full mb-4">
                <Search className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                No articles found
              </h3>
              <p className="text-white/70 max-w-md">
                We couldn't find any articles matching your current filters. Try
                adjusting your search criteria or browse all categories.
              </p>
              <Button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>

        {/* Expanded Article Overlay */}
        <AnimatePresence>
          {expandedArticleId !== null && currentArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              ref={overlayRef}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={handleOverlayClick}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-gradient-to-b from-dashboard-darker to-dashboard-darkest rounded-xl shadow-xl overflow-hidden border border-white/10"
              >
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Close article"
                    className="absolute left-4 top-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
                    onClick={handleCloseArticle}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <div className="absolute right-4 top-4 z-10 flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Bookmark article"
                      className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                    >
                      <BookmarkPlus className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Share article"
                      className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="h-64 relative overflow-hidden">
                    <img
                      src={currentArticle.image}
                      alt={currentArticle.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dashboard-darkest to-transparent"></div>
                  </div>
                </div>

                <div className="p-6 pb-0 flex-grow overflow-hidden">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <Badge className="bg-blue-600 text-white">
                      {currentArticle.category}
                    </Badge>
                    <div className="flex items-center text-white/60 text-sm">
                      <Calendar className="h-4 w-4 mr-1.5" />
                      {currentArticle.date}
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <Clock className="h-4 w-4 mr-1.5" />
                      {currentArticle.readTime}
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <Eye className="h-4 w-4 mr-1.5" />
                      {Math.floor(Math.random() * 1000) + 100} views
                    </div>
                  </div>

                  <h2 className="text-white text-3xl font-bold mb-4">
                    {currentArticle.title}
                  </h2>

                  <p className="text-white/80 mb-6 text-lg">
                    {currentArticle.excerpt}
                  </p>

                  <ScrollArea className="h-[calc(90vh-400px)]">
                    <div
                      className="prose prose-invert max-w-none pb-6"
                      dangerouslySetInnerHTML={{
                        __html: currentArticle.content,
                      }}
                    />

                    {/* Related articles */}
                    {relatedArticles.length > 0 && (
                      <div className="mt-8 mb-6">
                        <h3 className="text-white text-xl font-semibold mb-4">
                          Related Articles
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {relatedArticles.map((article) => (
                            <Card
                              key={article.id}
                              className="bg-white/5 hover:bg-white/10 border-white/10 cursor-pointer transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedArticleId(article.id);
                                const related = articles
                                  .filter(
                                    (a) =>
                                      a.id !== article.id &&
                                      (a.category === article.category ||
                                        a.seoKeywords.some((kw) =>
                                          article.seoKeywords.includes(kw)
                                        ))
                                  )
                                  .slice(0, 3);
                                setRelatedArticles(related);
                              }}
                            >
                              <CardContent className="p-4">
                                <div className="aspect-video mb-3 rounded-md overflow-hidden">
                                  <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <Badge className="mb-2 bg-blue-600/80 text-white text-xs">
                                  {article.category}
                                </Badge>
                                <h4 className="text-white text-sm font-medium line-clamp-2">
                                  {article.title}
                                </h4>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
