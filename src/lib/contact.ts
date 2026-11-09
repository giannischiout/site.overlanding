import { z } from "zod";

export const CONTACT_TOPICS = [
  { id: "booking", label: "A question before booking" },
  { id: "change", label: "Changing my booking" },
  { id: "road", label: "I'm on the road" },
  { id: "other", label: "Something else" },
] as const;

type TopicId = (typeof CONTACT_TOPICS)[number]["id"];
const topicIds = CONTACT_TOPICS.map((topic) => topic.id) as [
  TopicId,
  ...TopicId[],
];

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Tell us your name"),
  email: z.email("Enter an email we can reply to").trim(),
  topic: z.enum(topicIds, "Pick what it's about"),
  reference: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .min(10, "A little more detail helps us answer in one go")
    .max(2000, "Keep it under 2,000 characters"),
});

export type ContactInput = z.input<typeof contactSchema>;
