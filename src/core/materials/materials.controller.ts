import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { Material } from './entities/materials.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() request,
    @Body() createMaterialDto: CreateMaterialDto,
  ): Promise<Material> {
    const { username } = request.user;

    return this.materialsService.create(createMaterialDto, username);
  }

  @Get(':category')
  async findByCategory(
    @Param('category') category: string,
  ): Promise<Material[]> {
    return this.materialsService.findByCategory(category);
  }
}
