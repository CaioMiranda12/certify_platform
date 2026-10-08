import { variantLabels } from "@/components/certificates/constants";
import type { Certificate } from "@/components/certificates/types"; // ajuste o caminho do tipo
import type { CertificateDraft } from "@/stores/useCertificateDraftStore";

const UNTITLED_DRAFT_NAME = "Rascunho sem título";

function describeParticipants(count: number): string {
  if (count === 0) return "Sem participantes";
  return count === 1 ? "1 participante" : `${count} participantes`;
}

export function toCertificateListItem({ id, data, savedAt }: CertificateDraft): Certificate {
  return {
    id,
    name: data.activityName?.trim() || UNTITLED_DRAFT_NAME,
    student: describeParticipants(data.participants?.length ?? 0),
    model: variantLabels[data.variant],
    issuedAt: new Date(savedAt).toLocaleDateString("pt-BR"),
    status: "draft",
  };
}