export const CERTIFICATE_PATHS = {
  list: "/empresa/certificados",
  create: "/empresa/certificados/criar",
  edit: (certificateId: string | number) => `/empresa/certificados/criar/${certificateId}`,
};