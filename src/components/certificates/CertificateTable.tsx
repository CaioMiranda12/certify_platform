import type { Certificate, RequestStatus } from "./types";

import { CertificateRow } from "./CertificateRow";
import { EmptyState } from "./EmptyState";
import { CertificateLoading } from "./CertificateLoading";
import { CertificateError } from "./CertificateError";
import { CertificateNotFound } from "./CertificateNotFound";
import { useState } from "react";
import type { CertificateActionId } from "./certificateActions";
import { CertificateActionsModal } from "./CertificateActionsModal";
import { CERTIFICATE_PATHS } from "@/config/certificatePaths";
import { useNavigate } from "react-router-dom";

interface CertificateTableProps {
  certificates: Certificate[];
  status: RequestStatus;
  searchQuery?: string;
  isRetrying?: boolean;
  onRetry?: () => void;
  onCreate?: () => void;
}

const columns = [
  { label: "Nome do certificado", className: "w-[25%]" },
  { label: "Aluno", className: "w-[18%]" },
  { label: "Modelo", className: "w-[18%]" },
  { label: "Data de emissão", className: "w-[18%]" },
  { label: "Status", className: "w-[12%]" },
  { label: "Ação", className: "w-[9%]" },
];

export function CertificateTable({
  certificates,
  status,
  searchQuery,
  onCreate,
  isRetrying,
  onRetry,
}: CertificateTableProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const navigate = useNavigate();

  const closeActionsModal = () => setSelectedCertificate(null);

  const handleSelectAction = (actionId: CertificateActionId, certificate: Certificate) => {
    closeActionsModal();

    switch (actionId) {
      case "view":
        navigate(CERTIFICATE_PATHS.edit(certificate.id));
        break;
      case "edit":
      case "duplicate":
      case "delete":
        break;
    }
  };

  if (status === "loading") {
    return (
      <div className="w-full overflow-hidden rounded-lg bg-white">
        <CertificateLoading />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="w-full overflow-hidden rounded-lg bg-white">
        <CertificateError
          onRetry={onRetry}
          isRetrying={isRetrying}
        />
      </div>
    );
  }

  if (status === "notFound") {
    return (
      <div className="w-full overflow-hidden rounded-lg bg-white">
        <CertificateNotFound query={searchQuery ?? ""} />
      </div>
    );
  }

  const isEmpty = certificates.length === 0;

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white">
      {!isEmpty && (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[800px] table-fixed border-collapse">
            <thead>
              <tr className="border-b border-[#111111]/10">
                {columns.map((column) => (
                  <th
                    key={column.label}
                    scope="col"
                    className={`
                      ${column.className}
                      px-6
                      py-4
                      text-left
                      text-sm
                      font-semibold
                      text-[#111111]
                    `}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {certificates.map((certificate) => (
                <CertificateRow
                  key={certificate.id}
                  certificate={certificate}
                  onOpenActions={setSelectedCertificate}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isEmpty && <EmptyState onCreate={onCreate} />}

      <CertificateActionsModal
        certificate={selectedCertificate}
        onClose={closeActionsModal}
        onSelectAction={handleSelectAction}
      />
    </div>
  );
}

