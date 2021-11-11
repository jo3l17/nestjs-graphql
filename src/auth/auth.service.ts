import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MessageResponseDto } from '../common/dto/message-response.dto';
import { compare, hashPassword } from '../common/helpers/encrypt.helper';
import { generateToken, JWTPayload } from '../common/helpers/jwt.helper';
import { createEmail, HOST, sgMail } from '../common/helpers/sendgrid.helper';
import { JwtService } from '../common/services/jwt/jwt.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async signup(user: CreateUserDto): Promise<TokenDto> {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (userExists) {
      throw new NotAcceptableException('Email already registered');
    }
    const hash = hashPassword(user.password);
    const createdUser = await this.prismaService.user.create({
      data: {
        ...user,
        password: hash,
      },
    });
    if (user.role === 'user' || !user.role) {
      await this.prismaService.cart.create({
        data: {
          userId: createdUser.id,
        },
      });
    }
    const data: JWTPayload = {
      role: user.role || 'user',
      type: 'verification',
      uuid: createdUser.uuid,
    };
    const token = await this.jwtService.createToken(data, createdUser.id);
    const email = createEmail(
      user.email,
      'Verification',
      `Hello ${user.name} this is your verification email, use patch at this route`,
      `http://${HOST}/auth/${token.token}/verify`,
      token.token,
    );
    await sgMail.send(email);
    return { token: token.token, expiration: token.expiresAt };
  }

  verifyToken = async (token: string): Promise<MessageResponseDto> => {
    const verifiedToken = await this.jwtService.verifyToken(
      token,
      'verification',
    );
    await this.prismaService.user.update({
      data: {
        veryfiedAt: new Date(),
      },
      where: {
        uuid: verifiedToken.uuid,
      },
    });
    return { message: 'Account verified' };
  };

  signin = async (user: LoginUserDto): Promise<TokenDto> => {
    const userFound = await this.prismaService.user.findUnique({
      where: { email: user.email },
    });
    if (!userFound) {
      throw new NotFoundException('Invalid email or password');
    }
    const cart = await this.prismaService.cart.findFirst({
      where: {
        userId: userFound.id,
      },
    });
    if (!userFound.veryfiedAt) {
      throw new UnauthorizedException('User not verified');
    }
    const validPassword = compare(user.password, userFound.password);
    if (!validPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const tokenPayload: JWTPayload = {
      role: userFound.role,
      type: 'session',
      uuid: userFound.uuid,
    };
    if (cart) {
      tokenPayload.cartUuid = cart.uuid;
    }
    const token = await this.jwtService.createToken(tokenPayload, userFound.id);
    return { token: token.token, expiration: token.expiresAt };
  };

  logout = async (token: string): Promise<MessageResponseDto> => {
    await this.prismaService.token.deleteMany({
      where: {
        token: token.split(' ')[1],
      },
    });
    return { message: 'Logged out' };
  };

  refreshToken = async (token: string): Promise<TokenDto> => {
    const tokenString = token.split(' ')[1];
    const tokenFound = await this.prismaService.token.findFirst({
      where: {
        token: tokenString,
      },
    });
    if (!tokenString || !tokenFound) {
      throw new UnauthorizedException('No token found');
    }
    const user = await this.prismaService.user.findUnique({
      where: { id: tokenFound.userId },
      include: { cart: true },
    });
    const payload: JWTPayload = {
      role: user.role,
      type: 'session',
      uuid: user.uuid,
      cartUuid: user.cart.uuid || undefined,
    };
    const date = new Date();
    date.setHours(date.getHours() + 1);
    const newToken = generateToken(payload);
    await this.prismaService.token.update({
      where: { id: tokenFound.id },
      data: {
        token: newToken,
        expiresAt: date,
      },
    });
    return { token: newToken, expiration: date };
  };
}
