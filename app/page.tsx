"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Globe,
  Hash,
  User,
  Key,
  Cookie,
  Search,
  Loader2,
  Trash2,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { deleteMessagesSchema, type DeleteMessagesFormData } from "./schema";

type Status = { type: "error" | "success"; message: string } | null;

const inputBase =
  "w-full rounded-lg border border-zinc-300 bg-zinc-100/80 py-3 pl-10 pr-4 text-base text-zinc-900 placeholder-zinc-600 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-amber-400/30 focus:ring-offset-2 focus:ring-offset-white dark:border-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-100 dark:placeholder-zinc-400 dark:focus:ring-offset-slate-900 sm:py-2.5 sm:text-sm [touch-action:manipulation]";

export default function Home() {
  const [status, setStatus] = useState<Status>(null);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DeleteMessagesFormData>({
    resolver: zodResolver(deleteMessagesSchema),
    defaultValues: {
      workspace: "",
      targetChannelId: "",
      currentUserId: "",
      token: "",
      cookie: "",
      keyword: "",
      messageCount: 1000,
    },
  });

  const onSubmit = async (data: DeleteMessagesFormData) => {
    setStatus(null);
    try {
      const res = await axios.post<{ totalDeleted: number }>(
        "/api/delete-messages",
        data,
        { headers: { "Content-Type": "application/json" } },
      );
      setStatus({
        type: "success",
        message: `Done. Total messages deleted: ${res.data.totalDeleted}`,
      });
    } catch (err) {
      let message: string;
      if (axios.isAxiosError(err) && err.response?.data) {
        const data = err.response.data as { error?: string; totalDeleted?: number };
        message = data.error ?? err.message;
        if (err.response.status === 429 && typeof data.totalDeleted === "number") {
          message += ` (${data.totalDeleted} message${data.totalDeleted === 1 ? "" : "s"} deleted before stopping.)`;
        }
      } else {
        message = err instanceof Error ? err.message : "Network or server error";
      }
      setStatus({ type: "error", message });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 px-4 py-6 text-zinc-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-zinc-100 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-zinc-200/80 p-2.5 dark:bg-zinc-700/80" aria-hidden="true">
            <Trash2 className="h-6 w-6 text-zinc-900 dark:text-zinc-200" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Slack Message Deleter
            </h1>
            <p className="text-sm text-zinc-800 dark:text-zinc-300">
              Delete your messages by keyword or all at once
            </p>
          </div>
        </div>

        <form
          onSubmit={rhfHandleSubmit(onSubmit)}
          className="flex flex-col gap-4 sm:gap-3"
        >
          <div>
            <div className="mb-0 flex items-center gap-1.5">
              <label
                htmlFor="workspace"
                className="text-xs font-medium text-zinc-800 dark:text-zinc-300"
              >
                Workspace
              </label>
              <Link
                href="/about#workspace"
                className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-sm text-zinc-700 transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-amber-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-zinc-500 dark:hover:text-zinc-300 dark:focus-visible:ring-offset-slate-900"
                aria-label="How to get Workspace"
              >
                <HelpCircle className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-800 dark:text-zinc-500" />
              <input
                id="workspace"
                type="text"
                placeholder="your-workspace.slack.com"
                className={inputBase}
                {...register("workspace")}
              />
            </div>
            {errors.workspace && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-300" role="alert">
                {errors.workspace.message}
              </p>
            )}
          </div>

          <div>
            <div className="mb-0 flex items-center gap-1.5">
              <label
                htmlFor="targetChannelId"
                className="text-xs font-medium text-zinc-800 dark:text-zinc-300"
              >
                Target Channel ID
              </label>
              <Link
                href="/about#target-channel-id"
                className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-sm text-zinc-700 transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-amber-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-zinc-500 dark:hover:text-zinc-300 dark:focus-visible:ring-offset-slate-900"
                aria-label="How to get Target Channel ID"
              >
                <HelpCircle className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-800 dark:text-zinc-500" />
              <input
                id="targetChannelId"
                type="text"
                placeholder="D08FLHCR2AY"
                className={inputBase}
                {...register("targetChannelId")}
              />
            </div>
            {errors.targetChannelId && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-300" role="alert">
                {errors.targetChannelId.message}
              </p>
            )}
          </div>

          <div>
            <div className="mb-0 flex items-center gap-1.5">
              <label
                htmlFor="currentUserId"
                className="text-xs font-medium text-zinc-800 dark:text-zinc-300"
              >
                Current User ID
              </label>
              <Link
                href="/about#current-user-id"
                className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-sm text-zinc-700 transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-amber-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-zinc-500 dark:hover:text-zinc-300 dark:focus-visible:ring-offset-slate-900"
                aria-label="How to get Current User ID"
              >
                <HelpCircle className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-800 dark:text-zinc-500" />
              <input
                id="currentUserId"
                type="text"
                placeholder="U08FLHAN268"
                className={inputBase}
                {...register("currentUserId")}
              />
            </div>
            {errors.currentUserId && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-300" role="alert">
                {errors.currentUserId.message}
              </p>
            )}
          </div>

          <div>
            <div className="mb-0 flex items-center gap-1.5">
              <label
                htmlFor="token"
                className="text-xs font-medium text-zinc-800 dark:text-zinc-300"
              >
                Token (xoxc-...)
              </label>
              <Link
                href="/about#token"
                className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-sm text-zinc-700 transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-amber-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-zinc-500 dark:hover:text-zinc-300 dark:focus-visible:ring-offset-slate-900"
                aria-label="How to get Token"
              >
                <HelpCircle className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-800 dark:text-zinc-500" />
              <input
                id="token"
                type="password"
                placeholder="Paste your token"
                className={inputBase}
                {...register("token")}
              />
            </div>
            {errors.token && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-300" role="alert">
                {errors.token.message}
              </p>
            )}
          </div>

          <div>
            <div className="mb-0 flex items-center gap-1.5">
              <label
                htmlFor="cookie"
                className="text-xs font-medium text-zinc-800 dark:text-zinc-300"
              >
                Cookie
              </label>
              <Link
                href="/about#cookie"
                className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-sm text-zinc-700 transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-amber-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-zinc-500 dark:hover:text-zinc-300 dark:focus-visible:ring-offset-slate-900"
                aria-label="How to get Cookie"
              >
                <HelpCircle className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="relative">
              <Cookie className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-800 dark:text-zinc-500" />
              <input
                id="cookie"
                type="password"
                placeholder="Paste cookie header"
                className={inputBase}
                {...register("cookie")}
              />
            </div>
            {errors.cookie && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-300" role="alert">
                {errors.cookie.message}
              </p>
            )}
          </div>

          <div>
            <div className="mb-0 flex items-center gap-1.5">
              <label
                htmlFor="messageCount"
                className="text-xs font-medium text-zinc-800 dark:text-zinc-300"
              >
                Messages per request
              </label>
              <Link
                href="/about#message-count"
                className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-sm text-zinc-700 transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-amber-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-zinc-500 dark:hover:text-zinc-300 dark:focus-visible:ring-offset-slate-900"
                aria-label="About messages per request"
              >
                <HelpCircle className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-800 dark:text-zinc-500" />
              <input
                id="messageCount"
                type="number"
                min={1}
                max={1000}
                placeholder="1000"
                className={inputBase}
                {...register("messageCount", { valueAsNumber: true })}
              />
            </div>
            {errors.messageCount && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-300" role="alert">
                {errors.messageCount.message}
              </p>
            )}
          </div>

          <div>
            <div className="mb-0 flex items-center gap-1.5">
              <label
                htmlFor="keyword"
                className="text-xs font-medium text-zinc-800 dark:text-zinc-300"
              >
                Keyword{" "}
                <span className="font-normal text-zinc-600 dark:text-zinc-400">(optional)</span>
              </label>
              <Link
                href="/about#keyword"
                className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-sm text-zinc-700 transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-amber-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-zinc-500 dark:hover:text-zinc-300 dark:focus-visible:ring-offset-slate-900"
                aria-label="How to get Keyword"
              >
                <HelpCircle className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-800 dark:text-zinc-500" />
              <input
                id="keyword"
                type="text"
                placeholder="e.g. chacha"
                className={inputBase}
                {...register("keyword")}
              />
            </div>
            <p className="mb-6 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mt-2">
              Add a keyword to only delete messages containing that text; leave
              it empty to delete all your messages in the channel.
            </p>
            {errors.keyword && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-300" role="alert">
                {errors.keyword.message}
              </p>
            )}
          </div>

          {status && (
            <div
              role="alert"
              className={`rounded-lg px-4 py-3 text-sm ${
                status.type === "error"
                  ? "bg-red-100 text-red-800 border border-red-200 dark:bg-red-950/60 dark:text-red-200 dark:border-red-800/50"
                  : "bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-800/40"
              }`}
            >
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:ring-amber-400/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-700 dark:hover:bg-emerald-600 [touch-action:manipulation]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting…
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete messages
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
