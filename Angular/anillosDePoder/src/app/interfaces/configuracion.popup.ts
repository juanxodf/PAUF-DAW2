import { ButtonSeverity } from "primeng/button";

export interface ConfiguracionPopup {
  message: string,
  header?: string,
  nameButton: string,
  severity: ButtonSeverity
}