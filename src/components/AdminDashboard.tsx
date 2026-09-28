"use client";

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  type Timestamp,
} from "firebase/firestore";
import { auth, googleProvider, db } from "@/lib/firebase";

// Replace with your Google account UID after first login
// You'll see it logged in the console on first sign-in
const ADMIN_UIDS = new Set<string>([
  // Add your UID here after first login, e.g.:
  // "abc123xyz..."
]);

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Timestamp | null;
  read: boolean;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        // Log UID so you can add it to ADMIN_UIDS
        console.log("Signed in UID:", u.uid);
      }
    });
  }, []);

  useEffect(() => {
    if (!user || !isAdmin(user)) return;

    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
      setContacts(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as Contact))
      );
    });
  }, [user]);

  function isAdmin(u: User): boolean {
    // If no UIDs configured yet, allow any authenticated user
    // Once you add your UID, only that account gets access
    if (ADMIN_UIDS.size === 0) return true;
    return ADMIN_UIDS.has(u.uid);
  }

  async function handleLogin() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Login failed:", err);
    }
  }

  async function handleLogout() {
    await signOut(auth);
  }

  async function toggleRead(contact: Contact) {
    await updateDoc(doc(db, "contacts", contact.id), {
      read: !contact.read,
    });
  }

  async function handleDelete(id: string) {
    if (confirm("Delete this message permanently?")) {
      await deleteDoc(doc(db, "contacts", id));
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-foreground/40">Loading...</p>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Admin Access</h1>
          <p className="mt-2 text-sm text-foreground/50">
            Sign in with your authorized Google account.
          </p>
        </div>
        <button
          onClick={handleLogin}
          className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-background transition-all hover:bg-accent-dim hover:shadow-[0_0_24px_rgba(86,172,49,0.4)]"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  // Logged in but not admin
  if (!isAdmin(user)) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-red-400">Access Denied</h1>
        <p className="text-sm text-foreground/50">
          {user.email} is not an authorized admin.
        </p>
        <button
          onClick={handleLogout}
          className="text-sm text-foreground/40 transition-colors hover:text-accent"
        >
          Sign out
        </button>
      </div>
    );
  }

  const filtered =
    filter === "unread" ? contacts.filter((c) => !c.read) : contacts;
  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Contact Submissions</h1>
          <p className="mt-1 text-sm text-foreground/50">
            {contacts.length} total &middot; {unreadCount} unread
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-foreground/40">{user.email}</span>
          <button
            onClick={handleLogout}
            className="rounded-full border border-card-border px-4 py-1.5 text-xs transition-colors hover:border-accent hover:text-accent"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            filter === "all"
              ? "bg-accent text-background"
              : "border border-card-border text-foreground/50 hover:text-accent"
          }`}
        >
          All ({contacts.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            filter === "unread"
              ? "bg-accent text-background"
              : "border border-card-border text-foreground/50 hover:text-accent"
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Messages */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-card-border bg-card-bg p-12 text-center">
          <p className="text-foreground/40">
            {filter === "unread" ? "No unread messages." : "No messages yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((c) => (
            <div
              key={c.id}
              className={`rounded-2xl border bg-card-bg p-6 transition-all ${
                c.read
                  ? "border-card-border opacity-70"
                  : "border-accent/30 shadow-[0_0_20px_rgba(86,172,49,0.04)]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <span className="font-semibold">{c.name}</span>
                  <a
                    href={`mailto:${c.email}`}
                    className="ml-3 text-sm text-accent transition-colors hover:text-accent-dim"
                  >
                    {c.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  {!c.read && (
                    <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-medium text-accent">
                      NEW
                    </span>
                  )}
                  <span className="text-xs text-foreground/30 font-mono">
                    {c.createdAt
                      ? new Date(c.createdAt.seconds * 1000).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "—"}
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-foreground/70 whitespace-pre-wrap">
                {c.message}
              </p>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => toggleRead(c)}
                  className="text-xs text-foreground/40 transition-colors hover:text-accent"
                >
                  Mark as {c.read ? "unread" : "read"}
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-xs text-foreground/40 transition-colors hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
