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
  ChevronDown,
} from "lucide-react";
import { Footer } from "../components/footer/Footer";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { articles, categories } from "../components/Blog/articles"

const ARTICLES_PER_PAGE = 6;

const Blog = () => {
  const [expandedArticleId, setExpandedArticleId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [visibleArticlesCount, setVisibleArticlesCount] =
    useState(ARTICLES_PER_PAGE);
  const [isFilterBarSticky, setIsFilterBarSticky] = useState(false);

  const overlayRef = useRef(null);
  const filterBarRef = useRef(null);
  const loadMoreRef = useRef(null);

  // Handle scroll events for sticky filter bar
  useEffect(() => {
    const handleScroll = () => {
      if (filterBarRef.current) {
        const filterBarPosition =
          filterBarRef.current.getBoundingClientRect().top;
        setIsFilterBarSticky(filterBarPosition <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleArticleClick = useCallback((articleId) => {
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
    (e) => {
      if (e.target === overlayRef.current) handleCloseArticle();
    },
    [handleCloseArticle]
  );

  const handleCategoryClick = useCallback((category) => {
    setSelectedCategory(category);
    setVisibleArticlesCount(ARTICLES_PER_PAGE); // Reset visible count when category changes
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

  const loadMoreArticles = () => {
    setVisibleArticlesCount((prev) =>
      Math.min(prev + ARTICLES_PER_PAGE, filteredArticles.length)
    );
  };

  const visibleArticles = filteredArticles.slice(0, visibleArticlesCount);
  const hasMoreArticles = visibleArticlesCount < filteredArticles.length;

  useEffect(() => {
    const handleEscKey = (e) => {
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

      {/* Filter bar container */}
      <div ref={filterBarRef} className="bg-dashboard border-b border-white/5">
        {/* Search and filter bar */}
        <div
          className={`container mx-auto px-4 md:px-6 lg:px-8 py-6 ${
            isFilterBarSticky
              ? "sticky top-0 z-40 bg-dashboard/95 backdrop-blur-md shadow-md transition-all duration-200"
              : ""
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleArticlesCount(ARTICLES_PER_PAGE); // Reset count on search
                }}
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
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Results count */}
        <div className="mb-6 text-white/70">
          Showing {visibleArticles.length} of {filteredArticles.length}{" "}
          {filteredArticles.length === 1 ? "article" : "articles"}
          {selectedCategory !== "All Categories" && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {visibleArticles.length > 0 ? (
            visibleArticles.map((article) => (
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
                  setVisibleArticlesCount(ARTICLES_PER_PAGE);
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {hasMoreArticles && (
          <div ref={loadMoreRef} className="flex justify-center mt-10 mb-6">
            <Button
              onClick={loadMoreArticles}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 flex items-center gap-2 group"
            >
              Load More
              <ChevronDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        )}

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
                className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-black/60 rounded-xl shadow-xl overflow-hidden border border-white/10"
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
