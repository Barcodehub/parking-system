import { EmailRequest } from "../types/email.types";

export class EmailService {
    async sendSimulatedEmail(data: EmailRequest): Promise<{ mensaje: string }> {
      // Simular   envío de email
      console.log('Solicitud de email recibida:', JSON.stringify(data, null, 2));
      
      return { mensaje: "Correo Enviado" };
    }
  }