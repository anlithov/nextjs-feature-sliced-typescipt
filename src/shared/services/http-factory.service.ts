import { EnhancedWithAuthHttpService } from './http-auth.service';
import { HttpService } from './http.service';
import { JWT_LOCAL_STORAGE_KEYS } from '../lib/constants/jwt-keys.const';
import axios from 'axios';

export class HttpFactoryService {
  createHttpService(): HttpService {
    return new HttpService(axios);
  }

  createUserAuthHttpService() {
    return new EnhancedWithAuthHttpService(
      this.createHttpService(),
      JWT_LOCAL_STORAGE_KEYS.USER_ACCESS_TOKEN,
    );
  }
}
