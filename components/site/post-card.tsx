import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"

interface PostCardProps {
  title: string
  excerpt: string
  date: string
  slug: string
  coverImage?: string
  readTime?: string
}

export function PostCard({ title, excerpt, date, slug, coverImage, readTime = "5 min read" }: PostCardProps) {
  return (
    <article className="group rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300">
      {coverImage && (
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {readTime}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        <p className="text-gray-400 mb-4 line-clamp-2">
          {excerpt}
        </p>

        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          Read More
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}