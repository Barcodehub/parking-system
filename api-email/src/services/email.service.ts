import { EmailRequest } from "../types/email.types";

export class EmailService {
    async sendSimulatedEmail(data: EmailRequest): Promise<{ mensaje: string }> {
      // Simulamos el envío de email (en producción usarías Nodemailer o similar)
      console.log('Solicitud de email recibida:', JSON.stringify(data, null, 2));
      
      return { mensaje: "Correo Enviado" };
    }
  }