export interface User {
    id: number;
    userName: string;
    email: string;
    name: string;
    lastName: string;
    currentPassword?: string; // Opcional, para cambio de contraseña
    newPassword?: string;     // Opcional, para cambio de contraseña
  }
  