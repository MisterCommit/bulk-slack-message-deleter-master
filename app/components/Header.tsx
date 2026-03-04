"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Info, Github } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const GITHUB_REPO_URL =
  "https://github.com/MisterCommit/bulk-slack-message-deleter-master";

const navLinkBase =
  "flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-sm border-b-2 border-transparent py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-amber-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 sm:min-h-0 sm:min-w-0 sm:justify-start sm:py-0";

const navLinkDefault =
  "text-zinc-900 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50";

const navLinkActive =
  "border-amber-500 text-amber-700 dark:border-amber-400 dark:text-amber-400";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";

  return (
    <header className="border-b border-zinc-300 bg-white/95 px-4 py-3 dark:border-zinc-700/80 dark:bg-slate-950/95 sm:px-6 sm:py-4">
      <nav className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 sm:gap-6">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2 rounded-sm py-2 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-amber-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-zinc-300 dark:hover:text-zinc-50 dark:focus-visible:ring-offset-slate-950 sm:py-0"
        >
          <Image
            src="/images/slack-svgrepo-com.svg"
            alt="Slack"
            width={24}
            height={24}
            className="h-5 w-5 shrink-0 opacity-90 dark:opacity-100 sm:h-6 sm:w-6"
            aria-hidden
          />
          <span className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50 sm:whitespace-normal">
            Bulk Slack Message Deleter
          </span>
        </Link>

        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-4    ">
          <Link
            href="/"
            aria-current={isHome ? "page" : undefined}
            className={`${navLinkBase} rounded-sm ${isHome ? `${navLinkActive} hover:text-amber-800 dark:hover:text-amber-300` : `${navLinkDefault} hover:text-zinc-900 dark:hover:text-zinc-50`}`}
            aria-label="Home"
          >
            <Home className="h-4 w-4 shrink-0" aria-hidden />
            <span>Home</span>
          </Link>
          <Link
            href="/about"
            aria-current={isAbout ? "page" : undefined}
            className={`${navLinkBase} rounded-sm ${isAbout ? `${navLinkActive} hover:text-amber-800 dark:hover:text-amber-300` : `${navLinkDefault} hover:text-zinc-900 dark:hover:text-zinc-50`}`}
            aria-label="About"
          >
            <Info className="h-4 w-4 shrink-0" aria-hidden />
            <span>About</span>
          </Link>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${navLinkBase} ${navLinkDefault} rounded-sm hover:text-zinc-900 dark:hover:text-zinc-50`}
            aria-label="GitHub repository"
          >
            <Github className="h-4 w-4 shrink-0" aria-hidden />
            <span>GitHub</span>
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
