"use server";
import "server-only";

import { OpenAIInstance } from "@/features/common/services/openai";
import { ChatCompletionStreamingRunner } from "openai/resources/beta/chat/completions";
import { ChatThreadModel } from "../models";
export const ChatApiMultimodal = (props: {
  chatThread: ChatThreadModel;
  userMessage: string;
  file: string;
  signal: AbortSignal;
}): ChatCompletionStreamingRunner => {
  const { chatThread, userMessage, signal, file } = props;

  const openAI = OpenAIInstance();

  return openAI.beta.chat.completions.stream(
    {
      model: "",
      stream: true,
      max_tokens: 16384,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: userMessage },
            {
              type: "image_url",
              image_url: {
                url: file,
              },
            },
          ],
        },
      ],
    },
    { signal }
  );
};
