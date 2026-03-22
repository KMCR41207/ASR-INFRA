import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { Card, CardContent } from "../ui/card";
import { Tag, ArrowLeft, Clock, IndianRupee } from "lucide-react";
import { getUserOffers, type Offer } from "../../lib/offerStore";

const statusConfig = {
  pending:      { label: "Pending",      color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  counter_sent: { label: "Counter Sent", color: "bg-blue-100 text-blue-700 border-blue-200" },
  accepted:     { label: "Accepted",     color: "bg-green-100 text-green-700 border-green-200" },
  rejected:     { label: "Rejected",     color: "bg-red-100 text-red-700 border-red-200" },
};

export function MyOffersPage() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [filter, setFilter] = useState<"all" | Offer["status"]>("all");

  useEffect(() => {
    const auth = localStorage.getItem("userAuth");
    if (!auth) { navigate("/login"); return; }
    const { contact } = JSON.parse(auth);
    setOffers(getUserOffers(contact));
  }, [navigate]);

  const filtered = filter === "all" ? offers : offers.filter(o => o.status === filter);

  return (
    <div className="min-h-screen bg-[#e8f0f7]">
      <header className="bg-primary text-white px-6 py-4 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link to="/dashboard" className="text-[#a8c0d6] hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-accent" />
            <h1 className="text-xl font-bold">My Offers</h1>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "pending", "counter_sent", "accepted", "rejected"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                filter === f
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-[#4a6580] border-border hover:border-primary"
              }`}
            >
              {f === "all" ? "All" : statusConfig[f].label}
              <span className="ml-1.5 text-xs opacity-70">
                ({f === "all" ? offers.length : offers.filter(o => o.status === f).length})
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Tag className="w-12 h-12 text-[#a8c0d6] mx-auto mb-4" />
              <p className="text-primary font-semibold text-lg">No offers yet</p>
              <p className="text-[#4a6580] text-sm mt-1">The admin will send you offers after reviewing your requests.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {[...filtered].reverse().map(offer => {
              const sc = statusConfig[offer.status];
              return (
                <Link to={`/my-offers/${offer.id}`} key={offer.id}>
                  <Card className="hover:shadow-lg transition-all cursor-pointer group">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="bg-accent/10 p-2 rounded-lg">
                              <Tag className="w-4 h-4 text-accent" />
                            </div>
                            <h3 className="font-bold text-primary text-lg group-hover:text-accent transition-colors">
                              {offer.title}
                            </h3>
                          </div>
                          <p className="text-[#4a6580] text-sm mb-3 line-clamp-2">{offer.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 font-bold text-primary">
                              <IndianRupee className="w-4 h-4" />
                              {offer.currentAmount.toLocaleString()}
                            </span>
                            {offer.counterAmount && (
                              <span className="flex items-center gap-1 text-blue-600 font-semibold">
                                Counter: ₹{offer.counterAmount.toLocaleString()}
                              </span>
                            )}
                            <span className="flex items-center gap-1 text-[#4a6580]">
                              <Clock className="w-3 h-3" />
                              {new Date(offer.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${sc.color}`}>
                            {sc.label}
                          </span>
                          {offer.expiryDate && (
                            <span className="text-xs text-[#4a6580]">
                              Expires: {new Date(offer.expiryDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
