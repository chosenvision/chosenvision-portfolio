import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug } from "@/data/posts";
import type { ContentBlock } from "@/data/posts";

const Block = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case "h2":
      return <h2 className="font-serif text-2xl text-foreground mt-10 mb-4">{block.text}</h2>;
    case "list":
      return (
        <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc pl-5 mb-4">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-primary pl-5 py-1 my-6 text-foreground italic leading-relaxed">
          {block.text}
        </blockquote>
      );
    default:
      return <p className="text-muted-foreground leading-relaxed mb-4">{block.text}</p>;
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} — Kristhian Pinili`;
      window.scrollTo(0, 0);
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24">
        <article className="max-w-2xl mx-auto px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to blog
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={12} />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-6">{post.title}</h1>
            <div className="flex flex-wrap gap-2 mb-10">
              {post.tags.map((tag) => (
                <span key={tag} className="tag-minimal text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </motion.div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
