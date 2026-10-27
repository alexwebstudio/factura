"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Modal } from "@/components/ui/Modal";

// Форма (zod + react-hook-form) грузится только при первом открытии модалки — не на старте страницы.
const LeadForm = dynamic(() => import("./LeadForm").then((m) => m.LeadForm), {
  ssr: false,
  loading: () => <div className="h-[520px]" aria-busy="true" />,
});

type LeadModalApi = { open: (source?: string) => void };

const LeadModalContext = createContext<LeadModalApi>({ open: () => {} });

export function useLeadModal() {
  return useContext(LeadModalContext);
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [source, setSource] = useState<string | null>(null);
  const open = useCallback((s = "Модалка") => setSource(s), []);
  const close = useCallback(() => setSource(null), []);
  const api = useMemo(() => ({ open }), [open]);

  return (
    <LeadModalContext.Provider value={api}>
      {children}
      <Modal open={source !== null} onClose={close} title="Расчёт фасада">
        <p className="-mt-2 mb-6 text-ink-muted">
          Оставьте контакты — выедем на замер, сделаем расчёт и фикс-смету.
        </p>
        <LeadForm source={source ?? ""} onSuccess="inline" onDone={close} />
      </Modal>
    </LeadModalContext.Provider>
  );
}
