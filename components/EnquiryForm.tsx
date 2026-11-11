"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { SOCIAL } from "@/lib/site";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "textarea" | "select" | "file";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  half?: boolean;
  hint?: string;
};

const inputCls = "w-full min-h-[52px] rounded-2xl bg-raise px-4 py-3.5 font-medium text-text placeholder:text-dim/80 transition focus:outline-none focus:ring-2 focus:ring-gold";

const readAsDataUrl = (file: File) =>
  new Promise<string>((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });

/** Generic enquiry form that posts to /api/enquiries, then offers a WhatsApp follow-up. */
export default function EnquiryForm({
  type,
  fields,
  submitLabel,
  successTitle,
  whatsappIntro,
}: {
  type: "partner" | "order";
  fields: FieldDef[];
  submitLabel: string;
  successTitle: string;
  whatsappIntro: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [bad, setBad] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const set = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));

  const waText = encodeURIComponent(
    `${whatsappIntro}\n` + fields.filter((f) => f.type !== "file" && values[f.name]).map((f) => `${f.label}: ${values[f.name]}`).join("\n"),
  );
  const waLink = `https://wa.me/${SOCIAL.whatsapp.number}?text=${waText}`;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const missing = fields.filter((f) => f.required && f.type !== "file" && !values[f.name]?.trim()).map((f) => f.name);
    if (file && file.size > 3 * 1024 * 1024) missing.push("image");
    setBad(missing);
    if (missing.length) {
      setMessage(missing.includes("image") ? "That image is over 3MB. Try a smaller one." : "Please fill in the highlighted fields.");
      document.getElementById(`q-${missing[0]}`)?.focus();
      return;
    }
    setState("sending");
    setMessage("");
    try {
      const image = file ? await readAsDataUrl(file) : undefined;
      const website = (e.currentTarget.elements.namedItem("website") as HTMLInputElement)?.value;
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...values, image, website }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setBad(json.fields ?? []);
        throw new Error(json.error || "Something went wrong");
      }
      setState("done");
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (state === "done") {
    return (
      <div className="rounded-3xl bg-raise p-8" role="status">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-magenta-fill text-white"><Check className="h-6 w-6" aria-hidden /></span>
        <p className="serif-h mt-6 text-3xl">{successTitle}</p>
        <p className="mt-2 text-dim">We&apos;ve got your details and will reach out within two working days. Want a faster reply?</p>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-6">Send it on WhatsApp too</a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 md:grid-cols-2">
      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="q-website">Website</label>
        <input id="q-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {fields.map((f) => {
        const isBad = bad.includes(f.name) || (f.type === "file" && bad.includes("image"));
        const common = {
          id: `q-${f.name}`,
          name: f.name,
          disabled: state === "sending",
          "aria-invalid": isBad || undefined,
          "aria-describedby": f.hint ? `q-${f.name}-hint` : undefined,
          className: `${inputCls} ${isBad ? "ring-2 ring-magenta" : ""}`,
        };
        return (
          <div key={f.name} className={f.half ? "" : "md:col-span-2"}>
            <label htmlFor={`q-${f.name}`} className="mb-2 block text-sm font-bold">
              {f.label} {!f.required && <span className="font-normal text-dim">(optional)</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea {...common} rows={5} placeholder={f.placeholder} value={values[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} />
            ) : f.type === "select" ? (
              <select {...common} value={values[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)}>
                <option value="">Choose one</option>
                {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : f.type === "file" ? (
              <input
                {...common}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/heic"
                className={`${common.className} file:mr-4 file:rounded-full file:border-0 file:bg-magenta-fill file:px-4 file:py-2 file:font-bold file:text-white`}
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            ) : (
              <input {...common} type={f.type ?? "text"} autoComplete={f.autoComplete} placeholder={f.placeholder} value={values[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} />
            )}
            {f.hint && <p id={`q-${f.name}-hint`} className="mt-1.5 text-sm text-dim">{f.hint}</p>}
          </div>
        );
      })}

      <div className="md:col-span-2">
        {message && <p className="mb-4 font-bold text-blush" role="alert">{message}</p>}
        <button type="submit" disabled={state === "sending"} className="btn btn-fill w-full text-lg sm:w-auto disabled:opacity-60">
          {state === "sending" && <Loader2 className="h-5 w-5 animate-spin" aria-hidden />} {state === "sending" ? "Sending..." : submitLabel}
        </button>
        {state === "error" && (
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="ml-0 mt-3 block font-bold text-blush hover:underline sm:ml-4 sm:mt-0 sm:inline">
            Or send it on WhatsApp
          </a>
        )}
      </div>
    </form>
  );
}
