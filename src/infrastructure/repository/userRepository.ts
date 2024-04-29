import UserInterface from '../../usecase/interface/userInterface';
import UserModel from '../database/userModel';
import User from '../../domain/userd';


class  UserRepository implements UserInterface {
    // Saving user to database
    async saveUser(user: User): Promise<any>{
        const User = new UserModel(user);
        const savedUser = await User.save()
        .then((res)=>{
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
    async findUserById(id: string): Promise<any> {
        const userFound = await UserModel.findById(id);
        return userFound;
    }

    async findAllUsers(): Promise<any> {
        const allUsers = await UserModel.find();
        return allUsers;
    }
    async findAndUpdate(user: User): Promise<any> {
        if(user._id){
            const updateUser = await UserModel.findByIdAndUpdate(user._id,user,{new:true});
            return updateUser;
        }
    }

}


export default UserRepository;