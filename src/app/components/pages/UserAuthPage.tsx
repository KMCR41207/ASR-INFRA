import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Phone, Mail, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { supabaseAuth } from "../../../lib/supabaseAuth";

type Step = "input" | "otp";
type Method = "phone" | "email";

export function UserAuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<Step>("input");
  const [method, setMethod] = useState<Method>("phone");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  // ── Send OTP ──────────────────────────────────────────────────────────────
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (method === "phone" && !/^[6-9]\d{9}$/.test(contact)) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }
    if (method === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
      toast.error("Enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      if (method === "phone") {
        const { error } = await supabaseAuth.auth.signInWithOtp({
          phone: `+91${contact}`,
        });
        if (error) throw error;
        toast.success("OTP sent to your mobile number");
      } else {
        const { error } = await supabaseAuth.auth.signInWithOtp({
          email: contact,
          options: { shouldCreateUser: true },
        });
        if (error) throw error;
        toast.success("OTP sent to your email address");
      }
      setStep("otp");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send OTP";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ── Verify OTP ────────────────────────────────────────────────────────────
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = otp.join("");
    if (token.length < 6) return;

    setLoading(true);
    try {
      let error;
      if (method === "phone") {
        ({ error } = await supabaseAuth.auth.verifyOtp({
          phone: `+91${contact}`,
          token,
          type: "sms",
        }));
      } else {
        ({ error } = await supabaseAuth.auth.verifyOtp({
          email: contact,
          token,
          type: "email",
        }));
      }

      if (error) throw error;

      // Save lightweight session info for the rest of the app
      localStorage.setItem(
        "userAuth",
        JSON.stringify({ contact, method, verified: true })
      );

      toast.success("Verified! Redirecting...");

      const redirectPath = searchParams.get("redirect");
      const serviceType = searchParams.get("service");
      let destination = "/dashboard";
      if (redirectPath) {
        destination = serviceType
          ? `${redirectPath}?service=${serviceType}`
          : redirectPath;
      }

      setTimeout(() => navigate(destination), 800);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid OTP";
      toast.error(message);
      setOtp(["", "", "", "", "", ""]);
      document.getElementById("otp-0")?.focus();
    } finally {
      setLoading(false);
    }
  };

  // ── Resend OTP ────────────────────────────────────────────────────────────
  const handleResend = async () => {
    setLoading(true);
    try {
      if (method === "phone") {
        const { error } = await supabaseAuth.auth.signInWithOtp({
          phone: `+91${contact}`,
        });
        if (error) throw error;
      } else {
        const { error } = await supabaseAuth.auth.signInWithOtp({
          email: contact,
          options: { shouldCreateUser: true },
        });
        if (error) throw error;
      }
      setOtp(["", "", "", "", "", ""]);
      toast.success("New OTP sent!");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to resend OTP";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ── OTP input helpers ─────────────────────────────────────────────────────
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  // ── UI ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#e8f0f7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-3xl font-bold text-primary">ASR</span>
          <span className="text-3xl font-bold text-accent ml-1">INFRA</span>
          <p className="text-[#4a6580] mt-2">Verify your identity to request a quote</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="bg-accent/10 p-3 rounded-full">
                <ShieldCheck className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">
                  {step === "input" ? "Login to Continue" : "Enter OTP"}
                </h2>
                <p className="text-sm text-[#4a6580]">
                  {step === "input"
                    ? "We'll send a verification code to confirm your identity"
                    : `Code sent to ${method === "phone" ? "+91 " : ""}${contact}`}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            {step === "input" ? (
              <form onSubmit={handleSendOtp} className="space-y-5">
                {/* Method Toggle */}
                <div className="flex rounded-lg overflow-hidden border border-border">
                  <button
                    type="button"
                    onClick={() => { setMethod("phone"); setContact(""); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-all ${
                      method === "phone"
                        ? "bg-primary text-white"
                        : "bg-white text-[#4a6580] hover:bg-[#e8f0f7]"
                    }`}
                  >
                    <Phone className="w-4 h-4" /> Mobile
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMethod("email"); setContact(""); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-all ${
                      method === "email"
                        ? "bg-primary text-white"
                        : "bg-white text-[#4a6580] hover:bg-[#e8f0f7]"
                    }`}
                  >
                    <Mail className="w-4 h-4" /> Email
                  </button>
                </div>

                {/* Input */}
                <div>
                  <Label htmlFor="contact">
                    {method === "phone" ? "Mobile Number" : "Email Address"}
                  </Label>
                  <div className="relative mt-2">
                    {method === "phone" && (
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a6580] text-sm font-medium">
                        +91
                      </span>
                    )}
                    <Input
                      id="contact"
                      type={method === "phone" ? "tel" : "email"}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder={method === "phone" ? "98765 43210" : "you@example.com"}
                      className={method === "phone" ? "pl-12" : ""}
                      required
                      maxLength={method === "phone" ? 10 : undefined}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3"
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : (
                    <span className="flex items-center justify-center gap-2">
                      Send OTP <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="space-y-6">
                {/* OTP Boxes */}
                <div>
                  <Label className="block text-center mb-4">Enter 6-digit OTP</Label>
                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-11 h-12 text-center text-xl font-bold border-2 rounded-lg outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 bg-white text-primary"
                      />
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3"
                  disabled={otp.join("").length < 6 || loading}
                >
                  {loading ? "Verifying..." : (
                    <span className="flex items-center justify-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Verify & Continue
                    </span>
                  )}
                </Button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => { setStep("input"); setOtp(["", "", "", "", "", ""]); }}
                    className="text-[#4a6580] hover:text-primary transition-colors"
                  >
                    ← Change {method === "phone" ? "number" : "email"}
                  </button>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={loading}
                    className="flex items-center gap-1 text-accent hover:text-accent/80 font-semibold transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className="w-3 h-3" /> Resend OTP
                  </button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-[#4a6580] mt-4">
          Your information is secure and will only be used for service requests.
        </p>
      </div>
    </div>
  );
}
