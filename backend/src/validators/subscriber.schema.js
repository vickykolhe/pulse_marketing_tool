import { z } from "zod";

export const createSubscriberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
});

/* Bulk Subscribers */
export const bulkSubscriberSchema = z.array(createSubscriberSchema);
