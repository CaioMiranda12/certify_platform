import { useEffect, useId, useRef, type MouseEvent } from "react";
import { CERTIFICATE_ACTIONS, type CertificateActionId } from "./certificateActions";
import type { Certificate } from "./types";

type CertificateActionsModalProps = {
  certificate: Certificate | null;
  onClose: () => void;
  onSelectAction: (actionId: CertificateActionId, certificate: Certificate) => void;
};

export function CertificateActionsModal({
  certificate,
  onClose,
  onSelectAction,
}: CertificateActionsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const isOpen = certificate !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const closeOnBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={closeOnBackdropClick}
      className="m-auto w-full max-w-sm rounded-xl p-0 shadow-xl backdrop:bg-black/40"
    >
      {certificate && (
        <ul className="flex flex-col gap-1 p-4">
          {CERTIFICATE_ACTIONS.map(({ id, label, Icon, isDestructive, isComingSoon }) => (
            <li key={id}>
              <button
                type="button"
                disabled={isComingSoon}
                onClick={() => onSelectAction(id, certificate)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${isDestructive
                  ? "text-[#C10007] enabled:hover:bg-[#C10007]/10"
                  : "text-[#191C1D] enabled:hover:bg-[#0069A8]/10"
                  }`}
              >
                <Icon size={14} />
                <span className="flex-1 text-left">{label}</span>
                {isComingSoon && <span className="text-xs text-[#191C1D]/40">Em breve</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </dialog>
  );
}