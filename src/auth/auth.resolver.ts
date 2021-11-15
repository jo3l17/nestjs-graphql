import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MessageResponseModel } from '../common/model/message-response.model';
import { AuthService } from './auth.service';
import { CreateUserInput } from './dto/input/create-user.input';
import { LoginUserInput } from './dto/input/login-user.input';
import { User } from './model/user.model';
import { TokenModel } from './model/token.model';
import { TokenHeader } from '../common/decorators/token.decorator';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../common/guards/graphql.guard';
import { ResetPasswordInput } from './dto/input/reset-password.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => TokenModel)
  async signup(
    @Args({ name: 'input', type: () => CreateUserInput })
    data: CreateUserInput,
  ): Promise<TokenModel> {
    return await this.authService.signup(data);
  }

  @Mutation(() => TokenModel)
  async signIn(
    @Args({ name: 'input', type: () => LoginUserInput })
    data: LoginUserInput,
  ): Promise<TokenModel> {
    return await this.authService.signin(data);
  }

  @Mutation(() => MessageResponseModel)
  async verifyToken(
    @Args({ name: 'token', type: () => String }) token: string,
  ): Promise<MessageResponseModel> {
    return await this.authService.verifyToken(token);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => TokenModel)
  async refreshToken(@TokenHeader() token: string): Promise<TokenModel> {
    return await this.authService.refreshToken(token);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => MessageResponseModel)
  async logOut(@TokenHeader() token: string): Promise<MessageResponseModel> {
    return await this.authService.logout(token);
  }

  @Mutation(() => TokenModel)
  async recoveryPassword(
    @Args({ name: 'email', type: () => String }) email: string,
  ): Promise<TokenModel> {
    return await this.authService.recoveryPassword(email);
  }

  @Mutation(() => MessageResponseModel)
  async resetPassword(
    @Args({ name: 'input', type: () => ResetPasswordInput })
    body: ResetPasswordInput,
  ): Promise<MessageResponseModel> {
    return await this.authService.resetPassword(body.token, body.password);
  }
}
