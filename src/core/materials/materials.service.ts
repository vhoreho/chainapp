import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMaterialDto } from './dto/create-material.dto';
import { Material } from './entities/materials.entity';
import { UserRole } from 'src/enums/user-role.enum';
import { User } from '../users/entities/users.entity';
import { AUTHORIZATION_ERRORS } from 'src/constants/errors';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findMaterials(): Promise<Material[]> {
    const materials = await this.materialRepository.find({
      where: { isApproved: true },
    });

    return materials;
  }

  async create(
    createMaterialDto: CreateMaterialDto,
    username: string,
  ): Promise<Material> {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new BadRequestException(AUTHORIZATION_ERRORS.LOGIN.USER_NOT_FOUND);
    }

    const material = new Material();
    material.title = createMaterialDto.title;
    material.summary = createMaterialDto.summary;
    material.link = createMaterialDto.link;
    material.source = createMaterialDto.source;
    material.category = createMaterialDto.category;

    if (user.role === UserRole.ADMINISTRATOR) {
      material.isApproved = true;
    } else {
      material.isApproved = false;
    }

    return this.materialRepository.save(material);
  }

  async findByCategory(category: string): Promise<Material[]> {
    return this.materialRepository.find({ where: { category } });
  }

  async findPendingApproval(): Promise<Material[]> {
    return this.materialRepository.find({ where: { isApproved: false } });
  }

  async approveMaterial(id: number, userRole: UserRole): Promise<Material> {
    if (userRole !== UserRole.ADMINISTRATOR) {
      throw new UnauthorizedException('Only admins can approve materials');
    }

    const material = await this.materialRepository.findOne({ where: { id } });
    material.isApproved = true;
    return this.materialRepository.save(material);
  }
}
