"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { enquirySchema, subjects, type EnquiryInput } from "@/lib/enquiry-schema";

const field =
  "mt-2 block min-h-11 w-full rounded-sm border border-input bg-surface px-3 py-2 text-base text-foreground placeholder:text-muted-foreground";

export function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { subject: "General enquiry", website: "" },
  });

  async function onSubmit(values: EnquiryInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setServerError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      reset();
      setStatus("sent");
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border border-border bg-surface p-8">
        <CheckCircle2 className="h-8 w-8 text-brand" aria-hidden />
        <h3 className="mt-4 text-2xl font-bold text-brand-ink">Thank you, we’ve received your enquiry.</h3>
        <p className="mt-2 text-muted-foreground">Our team will get back to you shortly.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 min-h-11 text-sm font-semibold text-brand underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const err = (id: string, msg?: string) =>
    msg ? (
      <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-[#b3261e]">
        {msg}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className="text-sm font-semibold text-brand-ink">
          Name <span aria-hidden>*</span>
        </label>
        <input
          id="name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={field}
          {...register("name")}
        />
        {err("name", errors.name?.message)}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-semibold text-brand-ink">
          Email <span aria-hidden>*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={field}
          {...register("email")}
        />
        {err("email", errors.email?.message)}
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-semibold text-brand-ink">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className={field}
          {...register("phone")}
        />
        {err("phone", errors.phone?.message)}
      </div>

      <div>
        <label htmlFor="organisation" className="text-sm font-semibold text-brand-ink">
          Organisation
        </label>
        <input id="organisation" autoComplete="organization" className={field} {...register("organisation")} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="subject" className="text-sm font-semibold text-brand-ink">
          Subject
        </label>
        <select id="subject" className={field} {...register("subject")}>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="text-sm font-semibold text-brand-ink">
          Message <span aria-hidden>*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={field}
          {...register("message")}
        />
        {err("message", errors.message?.message)}
      </div>

      {/* Honeypot — hidden from people and assistive tech. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="sm:col-span-2">
        {serverError && (
          <p role="alert" className="mb-4 border border-[#b3261e] bg-[#fdecea] p-4 text-sm text-[#7a1a14]">
            {serverError}
          </p>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            "Send enquiry"
          )}
        </Button>
      </div>
    </form>
  );
}
