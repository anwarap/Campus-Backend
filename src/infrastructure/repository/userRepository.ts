import UserInterface from '../../usecase/interface/userInterface';
import UserModel from '../database/userModel';
import User from '../../domain/userd';


class  UserRepository implements UserInterface {
    // Saving user to database
    async saveUser(user: User): Promise<any>{
        const User = new UserModel(user);
        const savedUser = await User.save()
        .then((res)=>{
            console.log(`succes`,res)
            return res;
        })
        .catch((err)=>{
            console.log(err)
        })
        return savedUser;
    }

    //Checking email already exists
    async findByEmail(email: string): Promise<any> {
        const userFound = await UserModel.findOne({email});
        return userFound;
    }

    //Find user by id
    async findUserById(user: string): Promise<any> {
        const userFound = await UserModel.findById(user);
        return userFound;
    }


}


export default UserRepository;