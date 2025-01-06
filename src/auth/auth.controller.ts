import { Controller, Post, Req, Res } from '@nestjs/common';

@Controller('auth')
class AuthController {
  @Post()
  async login(@Req() req, @Res() res) {}
}

export { AuthController };
