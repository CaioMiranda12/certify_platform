import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLoader } from "react-icons/bi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import { useLoginAuth } from "@/hooks/Auth/useLoginAuth";
import { useFormValidation } from "@/hooks/useForm";
import { LoginSchema } from "@/schemas/Login";
import { useAuthStoreData } from "@/stores/useAuthStore";
import { TOAST_STYLES } from "./ToastStyleContainer";
import GirlWithCertificate from "@/assets/GirlWithCertificate.webp";
import EmpresaPhoto from "@/assets/EmpresaPhoto.png";
import Logo from "@/assets/Logo.svg";

export const FormLogin = () => {
  const [role, setRole] = useState<"aluno" | "empresa">("aluno");
  const [showPassword, setShowPassword] = useState(false);

  const { errors, handleSubmit, register, isValid } = useFormValidation(LoginSchema);
  const { mutate, isPending, isSuccess, isError } = useLoginAuth();
  const { auth } = useAuthStoreData();
  const navigation = useNavigate();

useEffect(() => {
  if (!auth?._id) return;

  if ((auth.role as string) === "empresa") {
    navigation("/");
  } else {
    navigation("/meus-certificados");
  }
}, [auth, navigation]);

useEffect(() => {
  if (isError) {
    toast.error("E-mail ou senha inválidos.", {
      position: "top-center",
      autoClose: 5000,
      ...TOAST_STYLES.error,
    });
  }

  if (isSuccess) {
    toast.success("Login realizado com sucesso!", {
      position: "top-center",
      autoClose: 3000,
      ...TOAST_STYLES.success,
    });
  }
}, [isError, isSuccess]);

const onSubmit = handleSubmit((formData: any) => {
  const authData = {
    ...formData,
    role,
  };

  mutate(authData);
});

return (
  <section className="flex min-h-screen w-full font-inter bg-white text-[#1A1551]">
    <ToastContainer />

    <div className="flex-1 w-full flex flex-col justify-center bg-white px-6 py-8 md:px-12 lg:px-16 xl:px-24">
      <div className="w-full max-w-md mx-auto">

        <div className="flex justify-end items-center gap-2 text-sm md:text-base mb-8">
          <span className="text-[#4B5563]">
          Ainda Não tem conta?
          </span>

          <Link
            to="/cadastro"
            className="font-bold text-[#0069a8] hover:text-[#0069a8] hover:underline transition-colors"
          >
            Criar conta
          </Link>
        </div>

        {/* =================================================
            TÍTULO
        ================================================== */}
        <div className="mb-7">
          <h1 className="text-[31px] font-semibold leading-tight text-[#060607] mb-3">
           Login          </h1>
        </div>

        {/* =================================================
            ALUNO / EMPRESA
        ================================================== */}
        <div
          className="flex gap-4 mb-7"
          role="tablist"
          aria-label="Selecione o tipo de perfil"
        >
          {/* Aluno */}
          <button
            type="button"
            role="tab"
            aria-selected={role === "aluno"}
            onClick={() => setRole("aluno")}
            className={`flex-1 py-3 rounded-xl border font-semibold transition-all duration-200 ${
              role === "aluno"
                ? "bg-[#0069a8] border-[#0069a8] text-white"
                : "bg-white border-[#D1D5DB] text-[#4B5563] hover:border-[#0069a8] hover:text-[#000000]"
            }`}
          >
            Aluno
          </button>

          {/* Empresa */}
          <button
            type="button"
            role="tab"
            aria-selected={role === "empresa"}
            onClick={() => setRole("empresa")}
            className={`flex-1 py-3 rounded-xl border font-semibold transition-all duration-200 ${
              role === "empresa"
                ? "bg-[#0069a8] border-[#0069a8] text-white"
                : "bg-white border-[#D1D5DB] text-[#4B5563] hover:border-[#0069a8] hover:text-[#000000]"
            }`}
          >
            Empresa
          </button>
        </div>

        {/* =================================================
            FORMULÁRIO
        ================================================== */}
        <form
          onSubmit={onSubmit}
          noValidate
          className="space-y-5"
        >

          {/* =================================================
              E-MAIL
          ================================================== */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-[#1A1551]"
            >
              E-mail
            </label>

            <div className="relative">
              <input
                {...register("email")}
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu e-mail"
                autoComplete="email"
                aria-label="E-mail"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "email-error" : undefined
                }
                className={`w-full px-4 py-4 rounded-xl bg-[#F3F4F6] border outline-none text-[#1A1551] placeholder-[#6B7280] font-medium transition-all duration-200 ${
                  errors.email
                    ? "border-[#DC2626] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
                    : "border-transparent focus:border-[#08080d] focus:ring-2 focus:ring-[#0d0c11]/20"
                }`}
              />

              {errors.email && (
                <FiAlertCircle
                  size={21}
                  aria-hidden="true"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#DC2626]"
                />
              )}
            </div>

            {errors.email && (
              <p
                id="email-error"
                role="alert"
                aria-live="polite"
                className="mt-2 text-sm font-medium text-[#DC2626]"
              >
                Digite um e-mail válido
              </p>
            )}
          </div>

          {/* =================================================
              SENHA
          ================================================== */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-[#1A1551]"
            >
              Senha
            </label>

            <div className="relative">
              <input
                {...register("password")}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                autoComplete="current-password"
                aria-label="Senha"
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className={`w-full px-4 py-4 pr-14 rounded-xl bg-[#F3F4F6] border outline-none text-[#1A1551] placeholder-[#6B7280] font-medium transition-all duration-200 ${
                  errors.password
                    ? "border-[#DC2626] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
                    : "border-transparent focus:border-[#030307] focus:ring-2 focus:ring-[#040407]/20"
                }`}
              />

              {/* Olho */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword
                    ? "Ocultar senha"
                    : "Exibir senha"
                }
                aria-live="polite"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#eeeef1] transition-colors"
              >
                {showPassword ? (
                  <FiEyeOff
                    size={22}
                    aria-hidden="true"
                  />
                ) : (
                  <FiEye
                    size={22}
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>

            {errors.password && (
              <p
                id="password-error"
                role="alert"
                aria-live="polite"
                className="mt-2 text-sm font-medium text-[#DC2626]"
              >
                Senha incorreta
              </p>
            )}
          </div>

          {/* Erro geral de autenticação */}
          {isError && (
            <p
              role="alert"
              aria-live="polite"
              className="text-sm font-medium text-[#DC2626]"
            >
              E-mail ou senha inválidos.
            </p>
          )}

          {/* =================================================
              LEMBRAR SENHA / ESQUECI MINHA SENHA
          ================================================== */}
          <div className="flex items-start justify-between mt-2">

            {/* Lembrar senha */}
            <div className="flex items-center pt-2">
              <input
                {...register("rememberMe")}
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                defaultChecked
                className="w-4 h-4 rounded border-[#D1D5DB] text-[#4F46E5] focus:ring-[#4F46E5]"
              />

              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm font-medium text-[#4B5563] cursor-pointer"
              >
                Lembrar senha
              </label>
            </div>

            {/* Esqueci minha senha */}
            <Link
              to="/forgot-password"
              state={{ role }}
              className="text-sm font-bold text-[#0069a8] hover:text-[#0069a8] hover:underline -mt-1 transition-colors"
            >
              Esqueci minha senha
            </Link>
          </div>

          {/* =================================================
              BOTÃO ENTRAR
          ================================================== */}
          <button
            type="submit"
            disabled={!isValid || isPending}
            aria-live="polite"
            className="
              w-full
              py-4
              rounded-xl
              bg-[#0069a8]
              text-white
              font-bold
              flex
              items-center
              justify-center
              gap-2
              transition-colors
              duration-200
              hover:bg-[#145572]
              disabled:bg-[#9CA3AF]
              disabled:cursor-not-allowed
              disabled:hover:bg-[#9CA3AF]
            "
          >
            {isPending ? (
              <>
                <BiLoader
                  size={22}
                  className="animate-spin"
                  aria-hidden="true"
                />

                <span>Carregando</span>
              </>
            ) : (
              "Entrar"
            )}
          </button>
{/* =================================================
    SUPORTE
================================================== */}
<div className="fixed bottom-6 left-6">

  <p className="text-sm text-[#000000] mb-1">
    Precisa de ajuda?
  </p>

  <div className="flex items-center gap-2">

    <span className="text-sm text-[#4B5563]">
      Fale com o nosso suporte
    </span>

    <a
      href="mailto:suporte@certify.com.br"
      className="text-sm font-semibold text-[#0069a8] hover:underline transition-colors"
    >
      suporte@certify.com.br
    </a>

  </div>

</div>
        </form>
      </div>
    </div>

    <div className="hidden md:block md:flex-1 relative overflow-hidden">

      {/* Imagem do perfil */}
      <img
        src={
          role === "empresa"
            ? EmpresaPhoto
            : GirlWithCertificate
        }
        alt={
          role === "empresa"
            ? "Imagem promocional para empresa"
            : "Imagem promocional de formatura"
        }
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Logo sobre a imagem */}
      <div className="absolute top-8 left-8 z-10">
        <img
          src={Logo}
          alt="Logo Certify"
          className="h-16 w-auto"
        />
      </div>
    </div>
  </section>
);
}