import { Injectable,NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    
    private users = [
    {
        "id":1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "securePassword123",
      "role": "admin"
    },
    {
        "id":2,
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "password": "mySecretPass456",
      "role": "user"
    },
    {
        "id":3,
      "name": "Bob Johnson",
      "email": "bob.johnson@example.com",
      "password": "bobsPassword789",
      "role": "editor"
    }
  ]

  findAll(role?: 'editor' | 'user' | 'admin') {
    if (!role) return this.users;
    return this.users.filter(user => user.role === role);

  }

  findOne(id: number){
    const user=this.users.find(user=>user.id===id)
    if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
    }
    return user
  }

  create(user: Omit<typeof this.users[0], 'id'>) {
  const newUser = {
    id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
    ...user
  };
  this.users.push(newUser);
  return newUser;
}

update(
  id: number,
  updateData: UpdateUserDto
) {
  const userIndex = this.users.findIndex(user => user.id === id);
  if (userIndex === -1) return null;

  this.users[userIndex] = {
    ...this.users[userIndex],
    ...updateData
    // No need to explicitly preserve id since it's not in updateData type
  };
  
  return this.users[userIndex];
}

delete(id: number){
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    const deletedUser = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return deletedUser;

}
}
