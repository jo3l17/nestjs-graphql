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
  signup(
    @Args({ name: 'input', type: () => CreateUserInput })
    data: CreateUserInput,
  ): Promise<TokenModel> {
    return this.authService.signup(data);
  }

  @Mutation(() => TokenModel)
  async signIn(
    @Args({ name: 'input', type: () => LoginUserInput })
    data: LoginUserInput,
  ): Promise<TokenModel> {
    return this.authService.signin(data);
  }

  @Mutation(() => MessageResponseModel)
  verifyToken(
    @Args({ name: 'token', type: () => String }) token: string,
  ): Promise<MessageResponseModel> {
    return this.authService.verifyToken(token);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => TokenModel)
  refreshToken(@TokenHeader() token: string): Promise<TokenModel> {
    return this.authService.refreshToken(token);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => MessageResponseModel)
  logOut(@TokenHeader() token: string): Promise<MessageResponseModel> {
    return this.authService.logout(token);
  }

  @Mutation(() => TokenModel)
  recoveryPassword(
    @Args({ name: 'email', type: () => String }) email: string,
  ): Promise<TokenModel> {
    return this.authService.recoveryPassword(email);
  }

  @Mutation(() => MessageResponseModel)
  resetPassword(
    @Args({ name: 'input', type: () => ResetPasswordInput })
    body: ResetPasswordInput,
  ): Promise<MessageResponseModel> {
    return this.authService.resetPassword(body.token, body.password);
  }
}
