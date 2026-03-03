import Link from "next/link";
import { Trash2, Info, Github } from "lucide-react";

const GITHUB_REPO_URL = "https://github.com/MisterCommit/bulk-slack-message-deleter-master";

export default function Header() {
  return (
    <header className="border-b border-zinc-700/80 bg-slate-950/95 px-6 py-4">
      <nav className="mx-auto flex max-w-3xl items-center justify-between gap-6">
        <span className="text-sm font-semibold text-zinc-50">Slack Message Deleter</span>
        <div className="flex items-center gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-sm text-sm font-medium text-zinc-300 transition-colors hover:text-zinc-50 focus-visible:ring-2 focus-visible:ring-amber-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <Trash2 className="h-4 w-4" aria-hidden />
          Deleter
        </Link>
        <Link
          href="/about"
          className="flex items-center gap-2 rounded-sm text-sm font-medium text-zinc-300 transition-colors hover:text-zinc-50 focus-visible:ring-2 focus-visible:ring-amber-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <Info className="h-4 w-4" aria-hidden />
          About
        </Link>
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-sm text-sm font-medium text-zinc-300 transition-colors hover:text-zinc-50 focus-visible:ring-2 focus-visible:ring-amber-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <Github className="h-4 w-4" aria-hidden />
          GitHub
        </a>
        </div>
      </nav>
    </header>
  );
}
