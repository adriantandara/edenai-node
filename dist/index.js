import a from"axios";class i{apiKey;apiUrl="https://api.edenai.run/v2/";constructor(t){this.apiKey=t}async getChatResponse(t,r){if(!this.apiKey)throw new Error("EdenAI API Key not set");if(r!=="google"&&r!=="openai")throw new Error("Invalid provider");a(`${this.apiUrl}/text/chat`,{method:"POST",headers:{accept:"application/json","Content-Type":"application/json",authorization:`Bearer ${this.apiKey}`},data:{response_as_dict:!0,attributes_as_list:!1,show_original_response:!1,temperature:0,max_tokens:1e3,providers:r,text:t}}).then(async({data:e})=>{if(e.openai.status==="success")return e.openai.generated_text;throw new Error("Not found response for chat.")}).catch(e=>{throw new Error(e)})}}export{i as EdenAINode};
