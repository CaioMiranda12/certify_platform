import { useCertificateDraftStore } from "@/stores/useCertificateDraftStore";

export function useCertificateDrafts() {
  const drafts = useCertificateDraftStore((state) => state.drafts);
  const deleteDraft = useCertificateDraftStore((state) => state.deleteDraft);
  const startNewDraft = useCertificateDraftStore((state) => state.startNewDraft);

  return { drafts, deleteDraft, startNewDraft };
}