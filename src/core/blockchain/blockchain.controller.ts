import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { CreateBlockDto } from './dto/blochchain.dto';
import { DIFFICULTY_BLOCK } from './constants';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Transaction } from './transaction.entity';

@Controller('blockchain')
export class BlockchainController {
  constructor(private blockchainService: BlockchainService) {}
  @Get()
  async getBlockChain() {
    return await this.blockchainService.getBlockchain();
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createBlock(@Body() block: CreateBlockDto): Promise<Transaction> {
    return await this.blockchainService.createBlock(block);
  }

  @Get('get-unsigned-transactions')
  @UseGuards(JwtAuthGuard)
  async getUnsignedTransaction(@Req() request) {
    const { id } = request;
    return await this.blockchainService.getUnsignedTransactions(id);
  }

  @Get('get-signed-transactions')
  @UseGuards(JwtAuthGuard)
  async getSignedTransaction(@Req() request) {
    const { id } = request;
    return await this.blockchainService.getSignedTransactions(id);
  }

  @Post('sign-transaction/:id')
  @UseGuards(JwtAuthGuard)
  async singTransaction(
    @Param('id') id: number,
    @Body() { privateKey },
    @Req() request,
  ) {
    const { username } = request.user;
    return await this.blockchainService.signTransaction(
      privateKey,
      id,
      username,
    );
  }

  @Get('clear')
  @UseGuards(JwtAuthGuard)
  async clearBlockChain() {
    return await this.blockchainService.clearBlockchain();
  }

  @Get('mine/:id')
  async mineBlock(@Param('id') id: number) {
    return await this.blockchainService.mineBlock(id, DIFFICULTY_BLOCK);
  }
}
