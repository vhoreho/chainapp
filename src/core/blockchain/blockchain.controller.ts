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
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { NewTransaction } from './entities/new-transaction.entity';

@Controller('blockchain')
export class BlockchainController {
  constructor(private blockchainService: BlockchainService) {}
  @Get()
  async getBlockChain() {
    return await this.blockchainService.getBlockchain();
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createBlock(
    @Req() request,
    @Body() block: CreateBlockDto,
  ): Promise<NewTransaction> {
    const { username } = request.user;

    return await this.blockchainService.createBlock(block, username);
  }

  @Get('get-unsigned-transactions')
  @UseGuards(JwtAuthGuard)
  async getUnsignedTransaction(@Req() request) {
    const { username } = request.user;

    return await this.blockchainService.getUnsignedTransactions(username);
  }

  @Get('get-signed-transactions')
  @UseGuards(JwtAuthGuard)
  async getSignedTransaction(@Req() request) {
    const { username } = request.user;
    return await this.blockchainService.getSignedTransactions(username);
  }

  @Get('get-transaction-for-mining')
  @UseGuards(JwtAuthGuard)
  async getTransactionsForMining(@Req() request) {
    const { username } = request.user;
    return await this.blockchainService.getTransactionsForMining(username);
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

  @Post('mine/:id')
  async mineBlock(@Param('id') id: number, @Body() { nonce }) {
    return await this.blockchainService.mineBlock(id, nonce);
  }

  @Get('delete-unsigned-transaction/:id')
  @UseGuards(JwtAuthGuard)
  async deleteUnsignedTransaction(@Param('id') id: number) {
    return await this.blockchainService.deleteUnsignedTransaction(id);
  }
}
