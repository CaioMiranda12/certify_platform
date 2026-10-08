import type { IconType } from "react-icons";
import {
  MdOutlineVisibility,
  MdOutlineFileDownload,
} from "react-icons/md";
import { FiEdit3, FiSend } from "react-icons/fi";
import { LuCopy } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";


export type CertificateActionId =
  | "view"
  | "edit"
  | "duplicate"
  | "delete"
  | "download"
  | "send";

type CertificateAction = {
  id: CertificateActionId;
  label: string;
  Icon: IconType;
  isDestructive?: boolean;
  isComingSoon?: boolean;
};

export const CERTIFICATE_ACTIONS: CertificateAction[] = [
  { id: "view", label: "Visualizar", Icon: MdOutlineVisibility },
  { id: "edit", label: "Editar", Icon: FiEdit3  },
  { id: "duplicate", label: "Duplicar", Icon: LuCopy  },
  { id: "send", label: "Enviar", Icon: FiSend , isComingSoon: true },
  { id: "download", label: "Baixar", Icon: MdOutlineFileDownload, isComingSoon: true },
  { id: "delete", label: "Excluir", Icon: FaRegTrashAlt , isDestructive: true },
];