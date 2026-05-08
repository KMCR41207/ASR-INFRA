import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Tag, FileText, LogOut, ChevronRight, Clock, CheckCircle, XCircle, ArrowLeftRight } from "lucide-react";
import { getUserOffers, type Offer } from "../../lib/offerStore";

const statusConfig = {
  pending:      { label: "Pending",      color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  counter_sent: { label: "Counter Sent", color: "bg-blue-100 text-blue-700 border-blue-200" },
  accepted:     { label: "Accepted",     color: "bg-green-100 text-green-700 border-green-200" },
  rejected:     { label: "Rejected",     color: "bg-red-100 text-red-700 border-red-200" },
};

export function UserDashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ contact: string; method: string } | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const auth = localStorage.getItem("userAuth");
    if (!auth) { navigate("/login"); return; }
    const parsed = JSON.parse(auth);
    setUser(parsed);
    setOffers(getUserOffers(parsed.contact));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userAuth");
    navigate("/");
  };

  const stats = {
    total: offers.length,
    pending: offers.filter(o => o.status === "pending").length,
    counter: offers.filter(o => o.status === "counter_sent").length,
    accepted: offers.filter(o => o.status === "accepted").length,
  };

  return (
    <div className="min-h-screen bg-[#e8f0f7]">
      {/* Header */}
      <header className="bg-primary text-white px-6 py-4 shadow-lg">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div>
            <span className="text-xl font-bold">ASR</span>
            <span className="text-xl font-bold text-accent ml-1">INFRA</span>
            <span className="text-[#a8c0d6] text-sm ml-3">User Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#a8c0d6]">{user?.contact}</span>
            <Button onClick={handleLogout} size="sm" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary">Welcome back!</h1>
          <p className="text-[#4a6580] mt-1">Manage your service requests and offers below.</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link to="/my-offers">
            <div className="bg-primary text-white rounded-xl p-5 flex items-center gap-4 hover:bg-primary/90 transition-all shadow-lg cursor-pointer group">
              <div className="bg-accent rounded-lg p-3">
                <Tag className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">My Offers</p>
                <p className="text-[#a8c0d6] text-sm">{stats.total} offer{stats.total !== 1 ? "s" : ""} available</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#a8c0d6] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link to="/quote">
            <div className="bg-white rounded-xl p-5 flex items-center gap-4 hover:shadow-lg transition-all border border-border cursor-pointer group">
              <div className="bg-accent/10 rounded-lg p-3">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-primary">Request Quote</p>
                <p className="text-[#4a6580] text-sm">Submit a new service request</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#4a6580] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Offers", value: stats.total, icon: <Tag className="w-5 h-5" />, color: "text-primary" },
            { label: "Pending", value: stats.pending, icon: <Clock className="w-5 h-5" />, color: "text-yellow-600" },
            { label: "Counter Sent", value: stats.counter, icon: <ArrowLeftRight className="w-5 h-5" />, color: "text-blue-600" },
            { label: "Accepted", value: stats.accepted, icon: <CheckCircle className="w-5 h-5" />, color: "text-green-600" },
          ].map((s, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center gap-3">
                <span className={s.color}>{s.icon}</span>
                <div>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-[#4a6580]">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Offers */}
        {offers.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-primary mb-4">Recent Offers</h2>
            <div className="space-y-3">
              {offers.slice(-3).reverse().map(offer => {
                const sc = statusConfig[offer.status];
                return (
                  <Link to={`/my-offers/${offer.id}`} key={offer.id}>
                    <Card className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-accent">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-primary">{offer.title}</p>
                          <p className="text-sm text-[#4a6580]">₹{offer.currentAmount.toLocaleString()}</p>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${sc.color}`}>
                          {sc.label}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
            <Link to="/my-offers" className="block mt-3 text-center text-accent text-sm font-semibold hover:underline">
              View all offers →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
