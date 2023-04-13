import { EnhancedWithAuthHttpService } from './http-auth.service';
import { HttpService } from './http.service';
import { JWT_LOCAL_STORAGE_KEYS } from '../../../../frontend/src/shared/constants/jwt-keys.const';
import { fetchingService } from '@/shared/services/fetch.service';

export class HttpFactoryService {
  createHttpService(): HttpService {
    return new HttpService(fetchingService);
  }

  createUserAuthHttpService() {
    return new EnhancedWithAuthHttpService(this.createHttpService(), JWT_LOCAL_STORAGE_KEYS.USER_ACCESS_TOKEN);
  }
}
