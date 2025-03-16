import { LandingNavbar } from "@/components/landingpage/components/Navbar/LandingNavbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useRef, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Tag } from "lucide-react";
import Head from "next/head";

const articles = [
  {
    id: 1,
    category: "Wealth Management",
    date: "Jan 24, 2024",
    title: "Smart Budgeting Strategies for Long-term Financial Success",
    image: "/BlogAssets/Smart-Budgeting-Strategies.png",
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
  "Crypto Markets",
  "Risk Analysis",
  "Sustainable Investing",
];

const Blog = () => {
  const [expandedArticleId, setExpandedArticleId] = useState<number | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleArticleClick = useCallback((articleId: number) => {
    setExpandedArticleId(articleId);
  }, []);

  const handleCloseArticle = useCallback(() => {
    setExpandedArticleId(null);
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

  const filteredArticles = articles.filter(
    (article) =>
      selectedCategory === "All Categories" ||
      article.category === selectedCategory
  );

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

  return (
    <div className="min-h-screen bg-dashboard">
      <Head>
        <title>AI Financial Insights | Market Analysis & Trends</title>
        <meta
          name="description"
          content="Expert-curated financial market analysis and investment strategy recommendations"
        />
        <meta
          name="keywords"
          content={articles
            .flatMap((article) => article.seoKeywords)
            .join(", ")}
        />
      </Head>

      <LandingNavbar />

      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className={`rounded-full ${
                selectedCategory === category
                  ? "bg-transparent border border-blue-600/30 hover:bg-blue-200/20"
                  : "bg-transparent border border-blue-600/30 hover:bg-blue-200/20"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {filteredArticles.map((article) => (
            <div key={article.id} className="relative">
              <Card
                className={`bg-white/5 backdrop-blur-lg border
                border-white/10 hover:scale-[1.02] hover:border-white/20 transition-all transition-transform duration-200 cursor-pointer ${
                  expandedArticleId === article.id ? "invisible" : ""
                }`}
                onClick={() => handleArticleClick(article.id)}
              >
                
                <CardContent className="p-0">
                  <div className="aspect-[16/9] relative overflow-hidden rounded-t-lg">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-blue-600 text-white">
                        {article.category}
                      </Badge>
                      <span className="text-dashboard-muted text-sm">
                        {article.date}
                      </span>
                    </div>
                    <h3 className="text-white text-xl font-semibold hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>

              {/* Expanded Article Overlay */}
              {expandedArticleId === article.id && (
                <div
                  ref={overlayRef}
                  className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
                  onClick={handleOverlayClick}
                >
                  <Card className="bg-dashboard-card border-none w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">
                    <CardContent className="p-0">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Close article"
                          className="absolute right-2 top-2 z-10 bg-black/50 hover:bg-black/70 text-white"
                          onClick={handleCloseArticle}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div className="aspect-[21/9] relative overflow-hidden rounded-t-lg">
                          <img
                            src={article.image}
                            alt={article.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Tag className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium text-blue-600">
                            {article.category}
                          </span>
                          <span className="text-dashboard-muted text-sm">
                            {article.date}
                          </span>
                        </div>
                        <h2 className="text-white text-2xl font-semibold mb-4">
                          {article.title}
                        </h2>
                        <ScrollArea className="h-[400px] pr-6 scrollbar-hide">
                          <div
                            className="prose prose-invert max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: article.content,
                            }}
                          />
                        </ScrollArea>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
