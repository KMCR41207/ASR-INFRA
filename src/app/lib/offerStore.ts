// Offer Store — localStorage-based data layer

export type OfferStatus = "pending" | "counter_sent" | "accepted" | "rejected";

export interface NegotiationEntry {
  id: number;
  type: "admin_offer" | "user_counter" | "admin_response" | "status_update";
  amount?: number;
  message: string;
  timestamp: string;
  author: "admin" | "user";
}

export interface Offer {
  id: number;
  userId: string;       // contact (phone/email)
  userName: string;
  title: string;
  description: string;
  originalAmount: number;
  currentAmount: number;
  counterAmount?: number;
  counterMessage?: string;
  adminNotes?: string;
  expiryDate?: string;
  status: OfferStatus;
  createdAt: string;
  updatedAt: string;
  history: NegotiationEntry[];
}

const KEY = "asrinfra_offers";

export const getOffers = (): Offer[] =>
  JSON.parse(localStorage.getItem(KEY) || "[]");

export const saveOffers = (offers: Offer[]) =>
  localStorage.setItem(KEY, JSON.stringify(offers));

export const getUserOffers = (userId: string): Offer[] =>
  getOffers().filter(o => o.userId === userId);

export const getOfferById = (id: number): Offer | undefined =>
  getOffers().find(o => o.id === id);

export const createOffer = (data: Omit<Offer, "id" | "createdAt" | "updatedAt" | "history" | "status" | "currentAmount">): Offer => {
  const offers = getOffers();
  const offer: Offer = {
    ...data,
    id: Date.now(),
    status: "pending",
    currentAmount: data.originalAmount,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    history: [{
      id: Date.now(),
      type: "admin_offer",
      amount: data.originalAmount,
      message: data.description,
      timestamp: new Date().toISOString(),
      author: "admin",
    }],
  };
  saveOffers([...offers, offer]);
  return offer;
};

export const submitCounter = (offerId: number, amount: number, message: string) => {
  const offers = getOffers();
  const updated = offers.map(o => {
    if (o.id !== offerId) return o;
    return {
      ...o,
      status: "counter_sent" as OfferStatus,
      counterAmount: amount,
      counterMessage: message,
      currentAmount: amount,
      updatedAt: new Date().toISOString(),
      history: [...o.history, {
        id: Date.now(),
        type: "user_counter" as const,
        amount,
        message,
        timestamp: new Date().toISOString(),
        author: "user" as const,
      }],
    };
  });
  saveOffers(updated);
};

export const adminRespondToOffer = (offerId: number, action: "accept" | "reject" | "revise", amount?: number, message?: string) => {
  const offers = getOffers();
  const updated = offers.map(o => {
    if (o.id !== offerId) return o;
    const status: OfferStatus = action === "accept" ? "accepted" : action === "reject" ? "rejected" : "pending";
    return {
      ...o,
      status,
      currentAmount: amount ?? o.currentAmount,
      updatedAt: new Date().toISOString(),
      history: [...o.history, {
        id: Date.now(),
        type: "admin_response" as const,
        amount: amount ?? o.currentAmount,
        message: message || (action === "accept" ? "Offer accepted!" : action === "reject" ? "Offer rejected." : "Revised offer sent."),
        timestamp: new Date().toISOString(),
        author: "admin" as const,
      }],
    };
  });
  saveOffers(updated);
};

export const userAcceptOffer = (offerId: number) => {
  const offers = getOffers();
  const updated = offers.map(o => {
    if (o.id !== offerId) return o;
    return {
      ...o,
      status: "accepted" as OfferStatus,
      updatedAt: new Date().toISOString(),
      history: [...o.history, {
        id: Date.now(),
        type: "status_update" as const,
        message: "User accepted the offer.",
        timestamp: new Date().toISOString(),
        author: "user" as const,
      }],
    };
  });
  saveOffers(updated);
};

export const userRejectOffer = (offerId: number) => {
  const offers = getOffers();
  const updated = offers.map(o => {
    if (o.id !== offerId) return o;
    return {
      ...o,
      status: "rejected" as OfferStatus,
      updatedAt: new Date().toISOString(),
      history: [...o.history, {
        id: Date.now(),
        type: "status_update" as const,
        message: "User rejected the offer.",
        timestamp: new Date().toISOString(),
        author: "user" as const,
      }],
    };
  });
  saveOffers(updated);
};
