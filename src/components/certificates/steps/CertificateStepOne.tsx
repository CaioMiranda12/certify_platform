import { useFormContext, useWatch } from "react-hook-form";
import { CertificateTemplate } from "@/components/certificates/CertificateTemplate";
import {
  activityOptions,
  descriptionOptions,
  modalityOptions,
  validityOptions,
  variantLabels,
} from "@/components/certificates/constants";
import type { CertificateFormData } from "@/schemas/CertificateSchema";
import { Field } from "../form/Field";
import { ImageField } from "../form/ImageField";
import { SelectField } from "../form/SelectField";
import { ToggleRow } from "../form/ToggleRow";
import { useSaveCertificateDraft } from "@/hooks/Certificate/useSaveCertificateDraft";


type CertificateStepOneProps = {
  onNext: () => void;
  onChangeTemplate: () => void;
};

export function CertificateStepOne({ onNext, onChangeTemplate }: CertificateStepOneProps) {
  const { register, control, formState: { errors } } = useFormContext<CertificateFormData>();
  const { saveCurrentFormAsDraft } = useSaveCertificateDraft();

  const variant = useWatch({ control, name: "variant" });
  const modalityEnabled = useWatch({ control, name: "modalityEnabled" });
  const validityEnabled = useWatch({ control, name: "validityEnabled" });
  const syllabusEnabled = useWatch({ control, name: "syllabusEnabled" })

  return (
    <section className="mt-8 flex gap-6">
      <div className="w-full max-w-[322px] flex flex-col gap-8">
        <div className="bg-white border border-[#E2E8F0] rounded-md flex justify-between px-5 py-3.5">
          <div className="flex flex-col gap-0.5">
            <p className="text-[#94A3B8] text-xs font-normal">Modelo escolhido</p>
            <p className="text-[#0066B2] text-sm font-semibold">{variantLabels[variant]}</p>
          </div>

          <button
            type="button"
            onClick={onChangeTemplate}
            className="bg-white border border-[#0069A84D] rounded-md px-3 py-2 text-[#030712] font-semibold text-xs cursor-pointer"
          >
            Trocar modelo
          </button>
        </div>

        <CertificateTemplate variant={variant} />
      </div>

      <div className="flex-1 bg-white p-6 flex flex-col gap-4 rounded-md">
        <SelectField
          name="activityType"
          label="Tipo de atividade"
          options={activityOptions}
          placeholder="Selecione o tipo de atividade"
        />

        <SelectField
          name="description"
          label="Descrição da certificação"
          options={descriptionOptions}
          placeholder="Selecione a descrição de certificação"
        />

        <Field label="Nome da atividade" error={errors.activityName?.message}>
          <input
            {...register("activityName")}
            className="h-10 w-full rounded-sm border border-[#A1A1A133] bg-white px-3 text-xs text-[#404040] outline-none"
            placeholder="Ex: Introdução ao React"
          />
        </Field>

        <Field label="Carga horária" error={errors.workload?.message}>
          <input
            {...register("workload")}
            className="h-10 w-full rounded-sm border border-[#A1A1A133] bg-white px-3 text-xs text-[#404040] outline-none"
            placeholder="Ex: 40h"
          />
        </Field>

        <div className="flex flex-col gap-1.5">
          <ToggleRow name="modalityEnabled" label="Local ou modalidade" />
          {modalityEnabled && (
            <SelectField name="modality" options={modalityOptions} placeholder="Selecione a modalidade" />
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <ToggleRow name="validityEnabled" label="Validade" />
          {validityEnabled && (
            <SelectField name="validity" options={validityOptions} placeholder="Selecione a validade" />
          )}
        </div>

        <ToggleRow name="syllabusEnabled" label="Conteúdo programático" />
        {syllabusEnabled && (
          <Field error={errors.syllabus?.message}>
            <textarea
              {...register("syllabus")}
              className="h-10 w-full rounded-sm border border-[#A1A1A133] bg-white p-2.5 text-xs text-[#404040] outline-none"
              placeholder="Descreva o conteúdo programático da atividade"
            />
          </Field>
        )}

        <div className="flex gap-3.5">
          <ImageField name="logo" label="Upload do logo" hint="PNG ou JPG até 200KB" accept="image/png,image/jpeg" />
          <ImageField name="signature" label="Upload da assinatura" hint="PNG até 200KB" accept="image/png" />
        </div>

        <div className="h-0.5 w-full bg-[#F1F5F9] my-4" />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={saveCurrentFormAsDraft}
            className="bg-white border border-[#0069A84D] rounded-md px-3 py-2 text-[#030712] font-semibold text-xs cursor-pointer h-12"
          >
            Salvar rascunho
          </button>
          <button
            type="button"
            onClick={onNext}
            className="bg-[#0069A8] text-[#F9FAFB] rounded-md px-3 py-2 font-semibold text-xs cursor-pointer h-12"
          >
            Continuar
          </button>
        </div>
      </div>
    </section>
  );
}