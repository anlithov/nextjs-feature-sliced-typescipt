import { NewUserDTO } from './user.requests.dto';
import { HttpService } from '../../../shared/services/http.service';
import { EnhancedWithAuthHttpService } from '../../../shared/services/http-auth.service';
import { UserDTO } from './user.responses.dto';
import { HttpFactoryService } from '../../../shared/services/http-factory.service';

export class UserService {
  constructor(
    private httpService: HttpService,
    private authHttpService: EnhancedWithAuthHttpService,
  ) {}

  async getOne(): Promise<UserDTO> {
    return this.authHttpService.get('user/me');
  }

  async create(body: NewUserDTO): Promise<UserDTO> {
    return this.authHttpService.post('user/create', body);
  }
}

const factory = new HttpFactoryService();
export const userService = new UserService(
  factory.createHttpService(),
  factory.createUserAuthHttpService(),
);
