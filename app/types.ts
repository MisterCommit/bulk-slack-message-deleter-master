export interface SlackConfig {
  workspace: string;
  targetChannelId: string;
  currentUserId: string;
  token: string;
  cookie: string;
  /** Optional: only delete messages containing this keyword (case-insensitive). Omit to delete all your messages. */
  keyword?: string;
  /** Optional: number of messages to fetch per API request (1–1000). Default 1000. */
  messageCount?: number;
}

export interface DeleteMessagesResponse {
  totalDeleted: number;
}

export interface DeleteMessagesError {
  error: string;
}
