import axios from "axios";

export class EdenAINode {
  private apiKey: string;
  private apiUrl: string = "https://api.edenai.run/v2/";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Get message response by prompt
   * @param message string
   * @param provider string - `openai` | `google`
   * @description https://www.edenai.co/ - to get the API key
   * @returns string - response by ai
   */
  public async getChatResponse(prompt: string, provider: "google" | "openai") {
    if (!this.apiKey) {
      throw new Error("EdenAI API Key not set");
    }

    if (provider !== "google" && provider !== "openai") {
      throw new Error("Invalid provider");
    }

    axios(`${this.apiUrl}/text/chat`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${this.apiKey}`,
      },
      data: {
        response_as_dict: true,
        attributes_as_list: false,
        show_original_response: false,
        temperature: 0,
        max_tokens: 1000,
        providers: provider,
        text: prompt,
      },
    })
      .then(async ({ data }) => {
        if (data.openai.status === "success") {
          return data.openai.generated_text;
        } else throw new Error("Not found response for chat.");
      })
      .catch((e) => {
        throw new Error(e);
      });
  }
}
