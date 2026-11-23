import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.email("Please enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .max(20)
    .regex(/^[+\d][\d\s-]{6,18}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  organisation: z.string().trim().max(150).optional().or(z.literal("")),
  subject: z.enum(["General enquiry", "Tender / bid enquiry", "Project enquiry", "Other"]),
  message: z.string().trim().min(10, "Please tell us a little more (10+ characters)").max(3000),
  // Honeypot: real users never see or fill this.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const subjects = enquirySchema.shape.subject.options;
