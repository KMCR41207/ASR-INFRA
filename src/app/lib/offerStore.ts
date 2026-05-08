// Offer Store - localStorage-based data store for offer negotiation

export type OfferStatus = "pending" | "counter_sent" | "accepted" | "rejected";

export interface HistoryEntry {
  author: "admin" | "user";
  amount?: number;
  message: string;
  timestamp: string;
}

export interface Offer {
  id: number;
  // Admin-facing fields
  userId: string;
  userName?: string;
  originalAmount: number;
  // User-facing alias
  userContact?: string;
  // Shared fields
  title: string;
  description: string;
  currentAmount: number;
  counterAmount?: number;
  status: OfferStatus;
  adminNotes?: string;
  expiryDate?: string;
  createdAt: string;
  updatedAt: string;
  history: HistoryEntry[];
}

const STORAGE_KEY = "offerStore";

function getAll(): Offer[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveAll(offers: Offer[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(offers));
}

// ─── Admin API ────────────────────────────────────────────────────────────────

/** Get all offers (admin use) */
export function getOffers(): Offer[] {
  return getAll();
}

/** Get all offers (alias) */
export function getAllOffers(): Offer[] {
  return getAll();
}

/** Create a new offer (admin sends to user) */
export function createOffer(data: {
  userId: string;
  userName?: string;
  title: string;
  description?: string;
  originalAmount: number;
  adminNotes?: string;
  expiryDate?: string;
}): Offer {
  const all = getAll();
  const entry: HistoryEntry = {
    author: "admin",
    amount: data.originalAmount,
    message: data.adminNotes || `New offer of ₹${data.originalAmount.toLocaleString()} from ASR INFRA.`,
    timestamp: new Date().toISOString(),
  };
  const newOffer: Offer = {
    id: Date.now(),
    userId: data.userId,
    userName: data.userName,
    userContact: data.userId,
    title: data.title,
    description: data.description || "",
    originalAmount: data.originalAmount,
    currentAmount: data.originalAmount,
    status: "pending",
    adminNotes: data.adminNotes,
    expiryDate: data.expiryDate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    history: [entry],
  };
  saveAll([...all, newOffer]);
  return newOffer;
}

/** Admin responds to an offer: accept / reject / revise */
export function adminRespondToOffer(
  id: number,
  action: "accept" | "reject" | "revise",
  amount?: number,
  message?: string
): void {
  const all = getAll();
  saveAll(
    all.map((o) => {
      if (o.id !== id) return o;
      let newStatus: OfferStatus = o.status;
      if (action === "accept") newStatus = "accepted";
      else if (action === "reject") newStatus = "rejected";
      else if (action === "revise") newStatus = "pending";

      const entry: HistoryEntry = {
        author: "admin",
        amount: action === "revise" ? amount : undefined,
        message: message || (action === "accept" ? "Offer accepted by admin." : action === "reject" ? "Offer rejected by admin." : `Revised offer: ₹${amount?.toLocaleString()}`),
        timestamp: new Date().toISOString(),
      };
      return {
        ...o,
        status: newStatus,
        currentAmount: action === "revise" && amount ? amount : o.currentAmount,
        originalAmount: action === "revise" && amount ? amount : o.originalAmount,
        counterAmount: action === "revise" ? undefined : o.counterAmount,
        updatedAt: new Date().toISOString(),
        history: [...o.history, entry],
      };
    })
  );
}

// ─── User API ─────────────────────────────────────────────────────────────────

/** Get offers for a specific user by contact (phone/email) */
export function getUserOffers(userContact: string): Offer[] {
  return getAll().filter(
    (o) => o.userId === userContact || o.userContact === userContact
  );
}

/** Get a single offer by ID */
export function getOfferById(id: number): Offer | undefined {
  return getAll().find((o) => o.id === id);
}

/** User submits a counter offer */
export function submitCounter(id: number, amount: number, message: string): void {
  const all = getAll();
  saveAll(
    all.map((o) => {
      if (o.id !== id) return o;
      const entry: HistoryEntry = {
        author: "user",
        amount,
        message: message || `Counter offer of ₹${amount.toLocaleString()}`,
        timestamp: new Date().toISOString(),
      };
      return {
        ...o,
        counterAmount: amount,
        status: "counter_sent" as OfferStatus,
        updatedAt: new Date().toISOString(),
        history: [...o.history, entry],
      };
    })
  );
}

/** User accepts the current offer */
export function userAcceptOffer(id: number): void {
  const all = getAll();
  saveAll(
    all.map((o) => {
      if (o.id !== id) return o;
      const entry: HistoryEntry = {
        author: "user",
        message: "Offer accepted by user.",
        timestamp: new Date().toISOString(),
      };
      return {
        ...o,
        status: "accepted" as OfferStatus,
        updatedAt: new Date().toISOString(),
        history: [...o.history, entry],
      };
    })
  );
}

/** User rejects the offer */
export function userRejectOffer(id: number): void {
  const all = getAll();
  saveAll(
    all.map((o) => {
      if (o.id !== id) return o;
      const entry: HistoryEntry = {
        author: "user",
        message: "Offer rejected by user.",
        timestamp: new Date().toISOString(),
      };
      return {
        ...o,
        status: "rejected" as OfferStatus,
        updatedAt: new Date().toISOString(),
        history: [...o.history, entry],
      };
    })
  );
}
