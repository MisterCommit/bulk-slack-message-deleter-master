import { NextRequest, NextResponse } from "next/server";
import type { SlackConfig } from "@/app/types";

const MESSAGE_COUNT = 1000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface SlackMessage {
  ts: string;
  user?: string;
  text?: string;
}

interface ConversationsHistoryResponse {
  ok: boolean;
  messages?: SlackMessage[];
  response_metadata?: { next_cursor?: string };
}

function formBody(params: Record<string, string>): string {
  return new URLSearchParams(params).toString();
}

export async function POST(request: NextRequest) {
  let config: SlackConfig;
  try {
    config = (await request.json()) as SlackConfig;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { workspace, targetChannelId, currentUserId, token, cookie, keyword } =
    config;
  if (!workspace || !targetChannelId || !currentUserId || !token || !cookie) {
    return NextResponse.json(
      {
        error:
          "Missing required fields: workspace, targetChannelId, currentUserId, token, cookie",
      },
      { status: 400 }
    );
  }

  const headers = {
    accept: "*/*",
    "cache-control": "no-cache",
    pragma: "no-cache",
    cookie,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  let cursor: string | undefined;
  let totalDeleted = 0;

  do {
    const historyParams: Record<string, string> = {
      token,
      channel: targetChannelId,
      limit: String(MESSAGE_COUNT),
    };
    if (cursor) {
      historyParams.cursor = cursor;
    } else {
      historyParams.oldest = "0";
      historyParams.latest = String(Date.now() / 1000);
    }

    const historyRes = await fetch(
      `https://${workspace}/api/conversations.history`,
      {
        method: "POST",
        headers,
        body: formBody(historyParams),
      }
    );

    const json = (await historyRes.json()) as ConversationsHistoryResponse;
    if (!json.ok) {
      return NextResponse.json(
        { error: "Slack API error", details: json },
        { status: 502 }
      );
    }

    const messages = json.messages ?? [];
    if (messages.length === 0) break;

    const keywordLower = keyword?.trim().toLowerCase() ?? "";

    for (const msg of messages) {
      if (msg.user !== currentUserId) continue;
      const text = (msg.text ?? "").toLowerCase();
      const matchesKeyword =
        keywordLower === "" || text.includes(keywordLower);
      if (!matchesKeyword) continue;
        await delay(500);
        const deleteRes = await fetch(`https://${workspace}/api/chat.delete`, {
          method: "POST",
          headers,
          body: formBody({
            token,
            channel: targetChannelId,
            ts: msg.ts,
          }),
        });
        const deleteRet = (await deleteRes.json()) as { ok?: boolean };
        if (deleteRet.ok) totalDeleted++;
    }

    cursor = json.response_metadata?.next_cursor ?? "";
  } while (cursor);

  return NextResponse.json({ totalDeleted });
}
