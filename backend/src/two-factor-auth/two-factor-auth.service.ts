import * as qrcode from 'qrcode';
import * as speakeasy from 'speakeasy';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TwoFactorAuthService {
  // Generate a secret for the user
  generateSecret() {
    const secret = speakeasy.generateSecret({
      name: 'AbleCoin', // This will be shown in Google Authenticator app
    });
    return secret;
  }

  // Generate a QR code based on the secret
  async generateQRCode(secret: string): Promise<string> {
    const otpauthUrl = speakeasy.otpauthURL({
      secret,
      label: 'AbleCoin',
      encoding: 'base32',
    });
    return await qrcode.toDataURL(otpauthUrl); // Return a Data URL of the QR code
  }

  // Verify the token sent from the frontend
  verifyToken(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
    });
  }
}
