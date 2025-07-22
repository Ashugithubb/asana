import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { HasingService } from 'src/hasing/hasing.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly hasingService: HasingService) { }

  async create(createUserDto: CreateUserDto) {
    const email = createUserDto.email;
    const existing = await this.userRepo.findOneBy({email})
    if(existing) return {"msg":"User Already Exist"};
    createUserDto.password = await this.hasingService.hashPassword(createUserDto.password)
    return await this.userRepo.save(createUserDto);
  }
  async findOneByemail(email: string) {
    return this.userRepo.findOneBy({ email })
  }

  
  async findOne(id: number) {
    return await this.userRepo.findOneBy({userId:id});
  }
  
  findAll() {
    return `This action returns all user`;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
