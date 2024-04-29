import User from "../../domain/userd";

interface UserInterface {
  saveUser(user: User): Promise<any>;
  findByEmail(email: string): Promise<any>;
  findUserById(id:string): Promise<any>;
  findAllUsers(): Promise<any>;
  findAndUpdate(user: User): Promise<any>;
}

export default UserInterface;
