import { UserDTO } from '../user.responses.dto';

export const mapUserDataIds = (users: UserDTO[]): string[] =>
  users.map((user) => user.id);
