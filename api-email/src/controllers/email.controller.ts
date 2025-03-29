import { Request, Response } from 'express';
import { EmailService } from '../services/email.service';

const emailService = new EmailService();

export const sendEmail = async (req: Request, res: Response) => {
  const { email, placa, mensaje, parqueaderoNombre } = req.body;
  
  if (!email || !placa || !mensaje || !parqueaderoNombre) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const result = await emailService.sendSimulatedEmail({
      email,
      placa,
      mensaje,
      parqueaderoNombre
    });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
};