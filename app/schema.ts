import { z } from "zod";

export const deleteMessagesSchema = z.object({
  workspace: z.string().min(1, "Workspace is required"),
  targetChannelId: z.string().min(1, "Target Channel ID is required"),
  currentUserId: z.string().min(1, "Current User ID is required"),
  token: z.string().min(1, "Token is required"),
  cookie: z.string().min(1, "Cookie is required"),
  keyword: z.string().optional(),
});

export type DeleteMessagesFormData = z.infer<typeof deleteMessagesSchema>;
