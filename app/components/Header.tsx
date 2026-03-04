import Link from "next/link";
import Image from "next/image";
import { Trash2, Info, Github } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const GITHUB_REPO_URL =
  "https://github.com/MisterCommit/bulk-slack-message-deleter-master";

export default function Header() {
  return (
    <header className="border-b border-zinc-300 bg-white/95 px-6 py-4 dark:border-zinc-700/80 dark:bg-slate-950/95">
      <nav className="mx-auto flex max-w-3xl items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-sm text-sm font-medium text-zinc-800 transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-amber-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-zinc-300 dark:hover:text-zinc-50 dark:focus-visible:ring-offset-slate-950"
        >
          <Image
            src="/images/slack-svgrepo-com.svg"
            alt="Slack"
            width={24}
            height={24}
            className="h-6 w-6 shrink-0 opacity-90 dark:opacity-100"
            aria-hidden
          />
          <span className="text-sm font-semibold text-zinc-900 flex items-center gap-2 dark:text-zinc-50">
            Bulk Slack Message Deleter
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className="flex items-center gap-2 rounded-sm text-sm font-medium text-zinc-800 transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-amber-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-zinc-300 dark:hover:text-zinc-50 dark:focus-visible:ring-offset-slate-950"
          >
            <Info
              className="h-4 w-4 text-zinc-700 dark:text-inherit"
              aria-hidden
            />
            About
          </Link>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-sm text-sm font-medium text-zinc-800 transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-amber-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-zinc-300 dark:hover:text-zinc-50 dark:focus-visible:ring-offset-slate-950"
          >
            <Github
              className="h-4 w-4 text-zinc-700 dark:text-inherit"
              aria-hidden
            />
            GitHub
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
