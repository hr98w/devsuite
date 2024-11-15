import type { HTMLAttributes } from "react"
import { cx } from "~/utils/cva"

export const Prose = ({ children, className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <div
      className={cx(
        "prose prose-neutral prose-a:text-foreground hover:prose-a:text-foreground/80 first:prose-p:mt-0 last:prose-p:mb-0 first:prose-ul:mt-0 last:prose-ul:mb-0 prose-li:mt-2 first:prose-li:mt-0 prose-img:border prose-img:border-neutral-200 prose-img:rounded-md prose-lead:text-lg/relaxed prose-strong:font-medium prose-strong:text-foreground prose-pre:font-mono prose-pre:rounded-none text-foreground/65 leading-relaxed",
        "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:font-display prose-headings:text-foreground",
        "prose-h1:text-3xl md:prose-h1:text-4xl prose-h2:text-2xl md:prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-base prose-h5:font-medium prose-h5:tracking-micro prose-h6:text-sm prose-h6:font-medium prose-h6:tracking-normal",
        "prose-code:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
