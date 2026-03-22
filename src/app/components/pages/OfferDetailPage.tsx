import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { ArrowLeft, Tag, CheckCircle, XCircle, ArrowLeftRight, IndianRupee, Clock, ShieldCheck } from "lucide-react";
import { getOfferById, submitCounter, userAcceptOffer, userRejectOffer, type Offer } from "../../lib/offerStore";
import { toast } from "sonner";

const statusConfig = {
  pending:      { label: "Pending",      color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  counter_sent: { label: "Counter Sent", color: "bg-blue-100 text-blue-700 border-blue-200" },
  accepted:     { label: "Accepted",     color: "bg-green-100 text-green-700 border-green-200" },
  rejected:     { label: "Rejected",     color: "bg-red-100 text-red-700 border-red-200" },
};

export function OfferDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [showCounter, setShowCounter] = useState(false);
  const [counterAmount, setCounterAmount] = useState("");
  const [counterMessage, setCounterMessage] = useState("");

  const reload = () => {
    const o = getOfferById(Number(id));
    if (!o) { navigate("/my-offers"); return; }
    setOffer(o);
  };

  useEffect(() => {
    const auth = localStorage.getItem("userAuth");
    if (!auth) { navigate("/login"); return; }
    reload();
  }, [id, navigate]);

  const handleAccept = () => {
    userAcceptOffer(Number(id));
    toast.success("Offer accepted!");
    reload();
  };

  const handleReject = () => {
    userRejectOffer(Number(id));
    toast.success("Offer rejected.");
    reload();
  };

  const handleCounter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counterAmount || isNaN(Number(counterAmount)) || Number(counterAmount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    submitCounter(Number(id), Number(counterAmount), counterMessage);
    toast.success("Counter offer submitted!");
    setShowCounter(false);
    setCounterAmount("");
    setCounterMessage("");
    reload();
  };

  if (!offer) return null;

  const sc = statusConfig[offer.status];
  const isActive = offer.status === "pending" || offer.status === "counter_sent";

  return (
    <div className="min-h-screen bg-[#e8f0f7]">
      <header className="bg-primary text-white px-6 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/my-offers" className="text-[#a8c0d6] hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2 flex-1">
            <Tag className="w-5 h-5 text-accent" />
            <h1 className="text-xl font-bold truncate">{offer.title}</h1>
          </div>
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${sc.color}`}>
            {sc.label}
          </span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Offer Summary Card */}
        <Card className="border-l-4 border-l-accent">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-[#4a6580] uppercase font-semibold mb-1">Offer Amount</p>
                <p className="text-3xl font-bold text-primary flex items-center gap-1">
                  <IndianRupee className="w-6 h-6" />{offer.currentAmount.toLocaleString()}
                </p>
              </div>
              {offer.counterAmount && (
                <div>
                  <p className="text-xs text-[#4a6580] uppercase font-semibold mb-1">Your Counter</p>
                  <p className="text-3xl font-bold text-blue-600 flex items-center gap-1">
                    <IndianRupee className="w-6 h-6" />{offer.counterAmount.toLocaleString()}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs text-[#4a6580] uppercase font-semibold mb-1">Date</p>
                <p className="text-sm text-primary flex items-center gap-1 mt-1">
                  <Clock className="w-4 h-4" />{new Date(offer.createdAt).toLocaleDateString()}
                </p>
                {offer.expiryDate && (
                  <p className="text-xs text-red-500 mt-1">Expires: {new Date(offer.expiryDate).toLocaleDateString()}</p>
                )}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-[#4a6580] uppercase font-semibold mb-1">Description</p>
              <p className="text-[#4a6580]">{offer.description}</p>
            </div>
            {offer.adminNotes && (
              <div className="mt-3 p-3 bg-[#e8f0f7] rounded-lg">
                <p className="text-xs text-[#4a6580] uppercase font-semibold mb-1">Admin Notes</p>
                <p className="text-sm text-primary">{offer.adminNotes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Negotiation History */}
        <Card>
          <CardHeader>
            <h2 className="font-bold text-primary flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-accent" /> Negotiation History
            </h2>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {offer.history.map((entry, i) => {
                const isAdmin = entry.author === "admin";
                return (
                  <div key={i} className={`flex gap-3 ${isAdmin ? "" : "flex-row-reverse"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold ${isAdmin ? "bg-primary" : "bg-accent"}`}>
                      {isAdmin ? "A" : "U"}
                    </div>
                    <div className={`max-w-[75%] ${isAdmin ? "" : "items-end"}`}>
                      <div className={`rounded-2xl px-4 py-3 ${isAdmin ? "bg-[#e8f0f7] rounded-tl-none" : "bg-primary text-white rounded-tr-none"}`}>
                        {entry.amount && (
                          <p className={`font-bold text-lg mb-1 ${isAdmin ? "text-primary" : "text-accent"}`}>
                            ₹{entry.amount.toLocaleString()}
                          </p>
                        )}
                        <p className={`text-sm ${isAdmin ? "text-[#4a6580]" : "text-[#a8c0d6]"}`}>{entry.message}</p>
                      </div>
                      <p className="text-xs text-[#4a6580] mt-1 px-1">
                        {isAdmin ? "Admin" : "You"} · {new Date(entry.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        {isActive && (
          <Card>
            <CardContent className="p-6">
              {!showCounter ? (
                <div>
                  <h3 className="font-bold text-primary mb-4">Your Response</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleAccept} className="bg-green-600 hover:bg-green-700 text-white gap-2">
                      <CheckCircle className="w-4 h-4" /> Accept Offer
                    </Button>
                    <Button onClick={() => setShowCounter(true)} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                      <ArrowLeftRight className="w-4 h-4" /> Counter Offer
                    </Button>
                    <Button onClick={handleReject} variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 gap-2">
                      <XCircle className="w-4 h-4" /> Reject
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCounter} className="space-y-4">
                  <h3 className="font-bold text-primary flex items-center gap-2">
                    <ArrowLeftRight className="w-5 h-5 text-accent" /> Submit Counter Offer
                  </h3>
                  <div>
                    <Label htmlFor="counterAmount">Your Counter Amount (₹) *</Label>
                    <div className="relative mt-2">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a6580]" />
                      <Input
                        id="counterAmount"
                        type="number"
                        value={counterAmount}
                        onChange={e => setCounterAmount(e.target.value)}
                        placeholder="Enter your offer amount"
                        className="pl-9"
                        required
                        min={1}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="counterMessage">Message / Notes</Label>
                    <Textarea
                      id="counterMessage"
                      value={counterMessage}
                      onChange={e => setCounterMessage(e.target.value)}
                      placeholder="Explain your counter offer..."
                      rows={3}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" className="bg-accent hover:bg-accent/90 text-white gap-2">
                      <ShieldCheck className="w-4 h-4" /> Submit Counter
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowCounter(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        )}

        {!isActive && (
          <Card className={`border-2 ${offer.status === "accepted" ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}>
            <CardContent className="p-4 flex items-center gap-3">
              {offer.status === "accepted"
                ? <CheckCircle className="w-6 h-6 text-green-600" />
                : <XCircle className="w-6 h-6 text-red-600" />}
              <p className={`font-semibold ${offer.status === "accepted" ? "text-green-700" : "text-red-700"}`}>
                This offer has been {offer.status}.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
