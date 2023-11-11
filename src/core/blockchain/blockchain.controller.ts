import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { CreateBlockDto } from './dto/blochchain.dto';
import { DIFFICULTY_BLOCK } from './constants';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('blockchain')
export class BlockchainController {
  constructor(private blockchainService: BlockchainService) {}
  @Get()
  async getBlockChain() {
    return await this.blockchainService.getBlockchain();
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createBlock(@Body() block: CreateBlockDto): Promise<CreateBlockDto> {
    return await this.blockchainService.createBlock(block);
  }

  @Get('clear')
  async clearBlockChain() {
    return await this.blockchainService.clearBlockchain();
  }

  @Get('mine/:id')
  async mineBlock(@Param('id') id: number) {
    return await this.blockchainService.mineBlock(id, DIFFICULTY_BLOCK);
  }
}
