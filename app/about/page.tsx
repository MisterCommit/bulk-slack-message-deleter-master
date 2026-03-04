"use client";

import { useEffect, useState } from "react";

export default function AboutPage() {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash) {
      const el = document.getElementById(hash);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      setHighlightedId(hash);
    }
  }, []);

  const highlightClass =
    "rounded-lg bg-amber-500/15 px-4 py-3 -mx-4 ring-2 ring-amber-400/60 transition-all duration-300";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 px-4 py-6 text-zinc-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-zinc-100 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          About Slack Message Deleter
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          This tool lets you delete your own messages in a Slack channel—either
          all of them or only those containing a specific keyword. Nothing you
          enter is saved or stored anywhere.
        </p>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            How it works
          </h2>
          <ol className="list-inside list-decimal space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li>
              You fill in the form with your Slack workspace details and
              credentials (see below).
            </li>
            <li>
              When you click &quot;Delete messages&quot;, the app asks Slack for
              the message history in the channel you chose.
            </li>
            <li>
              It finds messages sent by you. If you entered a keyword, it only
              deletes messages that contain that word (case-insensitive).
              Otherwise it deletes all your messages in that channel.
            </li>
            <li>
              It sends a delete request to Slack for each message, one at a
              time, with a short delay to avoid rate limits.
            </li>
            <li>When finished, it shows you how many messages were deleted.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            What you need
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            All of these are used only for the delete run. They are never saved
            in this app, in a database, or in the repository.
          </p>

          <div className="space-y-5">
            <div
              id="workspace"
              className={`scroll-mt-24 pt-1 ${highlightedId === "workspace" ? highlightClass : ""}`}
            >
              <h3 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Workspace
              </h3>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Your Slack workspace hostname, e.g.{" "}
                <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-emerald-700 dark:bg-zinc-800 dark:text-emerald-400">
                  your-company.slack.com
                </code>
                . You see it in the browser when you use Slack in the web app.
              </p>
            </div>

            <div
              id="target-channel-id"
              className={`scroll-mt-24 pt-1 ${highlightedId === "target-channel-id" ? highlightClass : ""}`}
            >
              <h3 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Target Channel ID
              </h3>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                The ID of the channel (or DM) whose messages you want to delete.
                Open that channel in Slack in the browser, then check the URL.
                It often looks like{" "}
                <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-emerald-700 dark:bg-zinc-800 dark:text-emerald-400">
                  /archives/C01234ABCD
                </code>{" "}
                or{" "}
                <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-emerald-700 dark:bg-zinc-800 dark:text-emerald-400">
                  /messages/D08FLHCR2AY
                </code>
                . The channel ID is the part after the last slash.
              </p>
            </div>

            <div
              id="current-user-id"
              className={`scroll-mt-24 pt-1 ${highlightedId === "current-user-id" ? highlightClass : ""}`}
            >
              <h3 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Current User ID
              </h3>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Your own Slack user ID (starts with{" "}
                <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-emerald-700 dark:bg-zinc-800 dark:text-emerald-400">
                  U
                </code>
                ). You can find it by opening your profile in Slack or by
                checking the URL when you view your own profile. It looks like{" "}
                <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-emerald-700 dark:bg-zinc-800 dark:text-emerald-400">
                  U08FLHAN268
                </code>
                .
              </p>
            </div>

            <div
              id="token"
              className={`scroll-mt-24 pt-1 ${highlightedId === "token" ? highlightClass : ""}`}
            >
              <h3 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Token
              </h3>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                A Slack session token (often starts with{" "}
                <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-emerald-700 dark:bg-zinc-800 dark:text-emerald-400">
                  xoxc-
                </code>
                ). You can get it from the browser: open Slack in the web app,
                open Developer Tools (F12), go to Application → Cookies (or
                Storage), find the cookie for your Slack domain, or in Network
                tab look at request headers for a request to Slack. The token is
                sensitive: treat it like a password and never share it or commit
                it to code.
              </p>
            </div>

            <div
              id="cookie"
              className={`scroll-mt-24 pt-1 ${highlightedId === "cookie" ? highlightClass : ""}`}
            >
              <h3 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Cookie
              </h3>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                The full{" "}
                <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-emerald-700 dark:bg-zinc-800 dark:text-emerald-400">
                  cookie
                </code>{" "}
                header value from your browser when you are logged into Slack.
                Again, get this from Developer Tools while on your Slack
                workspace. It is used so the app can act as your session when
                calling Slack’s API. Do not share this or store it in the
                repository.
              </p>
            </div>

            <div
              id="keyword"
              className={`scroll-mt-24 pt-1 ${highlightedId === "keyword" ? highlightClass : ""}`}
            >
              <h3 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Keyword (optional)
              </h3>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                If you leave this empty, the app will delete all your messages
                in the chosen channel. If you enter a word or phrase (e.g.{" "}
                <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-emerald-700 dark:bg-zinc-800 dark:text-emerald-400">
                  chacha
                </code>
                ), only messages whose text contains that keyword
                (case-insensitive) will be deleted.
              </p>
            </div>

            <div
              id="message-count"
              className={`scroll-mt-24 pt-1 ${highlightedId === "message-count" ? highlightClass : ""}`}
            >
              <h3 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Messages per request
              </h3>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                How many messages Slack returns per API call (between 1 and{" "}
                <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-emerald-700 dark:bg-zinc-800 dark:text-emerald-400">
                  1000
                </code>
                ). The default is 1000, which is Slack’s maximum. The app
                fetches history in batches of this size and deletes your
                matching messages from each batch. You usually don’t need to
                change this unless you want smaller batches (e.g. for testing).
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            We don’t save anything
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <strong className="text-zinc-800 dark:text-zinc-200">No data is stored.</strong> Your
            workspace, channel ID, user ID, token, cookie, and keyword are only
            used for the duration of the request. They are sent from your
            browser to our server (to avoid Slack’s CORS restrictions), and the
            server uses them only to call Slack’s API. We do not log them, save
            them to a database, or write them to the repository. The codebase
            and this app are designed so that nothing you enter is persisted.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Technical note
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            The form runs in your browser. Because Slack’s API does not allow
            direct browser requests from other origins (CORS), the app uses a
            small server-side API route that receives your form data and
            forwards the requests to Slack. That route does not store the data;
            it only uses it for the delete run and then discards it.
          </p>
        </section>
      </div>
    </main>
  );
}
