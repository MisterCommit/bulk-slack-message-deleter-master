import { z } from "zod";

export const deleteMessagesSchema = z.object({
  workspace: z.string().min(1, "Workspace is required"),
  targetChannelId: z.string().min(1, "Target Channel ID is required"),
  currentUserId: z.string().min(1, "Current User ID is required"),
  token: z.string().min(1, "Token is required"),
  cookie: z.string().min(1, "Cookie is required"),
  keyword: z.string().optional(),
  messageCount: z.preprocess(
    (v) => {
      const n = Number(v);
      return v === "" || v === undefined || Number.isNaN(n) ? 1000 : n;
    },
    z.number().int("Must be a whole number").min(1, "Must be at least 1").max(1000, "Slack allows max 1000 per request")
  ),
});

export type DeleteMessagesFormData = z.infer<typeof deleteMessagesSchema>;
