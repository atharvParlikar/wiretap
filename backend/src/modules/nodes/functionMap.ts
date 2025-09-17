import { sendMail } from "./email";

export const functionMap = {
  webhookNode: (params: Record<string, string>) => params,
  emailNode: sendMail
};
