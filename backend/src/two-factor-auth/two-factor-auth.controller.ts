import { TwoFactorAuthService } from './two-factor-auth.service';
import { Controller, Post, Body, Req, Res } from '@nestjs/common';

@Controller('2fa')
export class TwoFactorAuthController {
  constructor(private readonly twoFactorAuthService: TwoFactorAuthService) {}

  // Endpoint to generate a secret and QR code for 2FA
  @Post('generate')
  async generateTwoFactorAuth(@Body() body, @Req() req, @Res() res) {
    const user = req.user; // Assuming you have a user authentication system
    console.log(body);
    const secret = this.twoFactorAuthService.generateSecret();
    const qrCode = await this.twoFactorAuthService.generateQRCode(
      secret.base32,
    );

    // Save the secret in the user's database if necessary
    // e.g., user.twoFactorAuthSecret = secret.base32;

    return res.json({
      qrCode,
      secret: secret.base32, // You shouldn't expose this on the frontend
    });
  }

  // Endpoint to verify the token from Google Authenticator
  @Post('verify')
  async verifyToken(@Body() body, @Req() req, @Res() res) {
    console.log(body);
    const { token, secret } = body;
    const user = req.user; // Assume you have user authentication

    const isValid = this.twoFactorAuthService.verifyToken(secret, token);

    if (isValid) {
      // Mark 2FA as enabled for the user
      return res.json({ success: true });
    } else {
      return res.json({ success: false, message: 'Invalid token' });
    }
  }
}
