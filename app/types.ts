export interface SlackConfig {
  workspace: string;
  targetChannelId: string;
  currentUserId: string;
  token: string;
  cookie: string;
  /** Optional: only delete messages containing this keyword (case-insensitive). Omit to delete all your messages. */
  keyword?: string;
}

export interface DeleteMessagesResponse {
  totalDeleted: number;
}

export interface DeleteMessagesError {
  error: string;
}
