import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MessageResponseModel } from '../common/model/message-response.model';
import { AuthService } from './auth.service';
import { CreateUserInput } from './dto/input/create-user.input';
import { LoginUserInput } from './dto/input/login-user.input';
import { User } from './model/user.model';
import { TokenModel } from './model/token.model';

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
  async signin(
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

  @Mutation(() => TokenModel)
  async refreshToken(
    @Args({ name: 'token', type: () => String }) token: string,
  ): Promise<TokenModel> {
    return await this.authService.refreshToken(token);
  }

  @Mutation(() => MessageResponseModel)
  async logout(
    @Args({ name: 'token', type: () => String }) token: string,
  ): Promise<MessageResponseModel> {
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
    @Args({ name: 'token', type: () => String }) token: string,
    @Args({ name: 'password', type: () => String }) password: string,
  ): Promise<MessageResponseModel> {
    return await this.authService.resetPassword(token, password);
  }
}
