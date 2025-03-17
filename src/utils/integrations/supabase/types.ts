export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          title: string;
          category: string;
          content: string;
          image: string;
          date: string;
          author: string;
          tags: string[];
          summary: string;
          is_published: boolean;
        };
        Insert: {
          id?: string;
          title: string;
          category: string;
          content: string;
          image: string;
          date?: string;
          author?: string;
          tags?: string[];
          summary?: string;
          is_published?: boolean;
        };
        Update: {
          id?: never;
          title?: string;
          category?: string;
          content?: string;
          image?: string;
          date?: string;
          author?: string;
          tags?: string[];
          summary?: string;
          is_published?: boolean;
        };
      };
      formData: {
        Row: {
          id: string;
          name: string;
          email: string;
          company?: string | null;
          reason?: string | null;
          created_at: boolean;
        };
        Insert: {
          id?: string;
          name?: string;
          email?: string;
          company?: string | null;
          reason?: string | null;
          created_at?: boolean;
        };
      };
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

type Tables = PublicSchema["Tables"];
type BlogPosts = Tables["blog_posts"];
type RowOfBlogPosts = BlogPosts["Row"];
type InsertIntoBlogPosts = BlogPosts["Insert"];
type UpdateBlogPosts = BlogPosts["Update"];
type RowOfBlogPostsJson = RowOfBlogPosts & { image?: string | null };
type InsertIntoBlogPostsJson = InsertIntoBlogPosts & { image?: string | null };
type UpdateBlogPostsJson = UpdateBlogPosts & { image?: string | null };
type RowOfBlogPostsJsonUnion = RowOfBlogPostsJson | RowOfBlogPosts;
type InsertIntoBlogPostsJsonUnion = InsertIntoBlogPostsJson | InsertIntoBlogPosts;
type UpdateBlogPostsJsonUnion = UpdateBlogPostsJson | UpdateBlogPosts;
type RowOfBlogPostsJsonUnionArray = RowOfBlogPostsJsonUnion[];
type InsertIntoBlogPostsJsonUnionArray = InsertIntoBlogPostsJsonUnion[];
type UpdateBlogPostsJsonUnionArray = UpdateBlogPostsJsonUnion[];