import User from "../../domain/userd";

interface UserInterface {
  saveUser(user: User): Promise<any>;
  findByEmail(email: string): Promise<any>;
  findUserById(user:string): Promise<any>;
}

export default UserInterface;
