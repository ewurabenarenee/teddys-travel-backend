import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseService } from './expense.service';

@ApiTags('expense')
@Controller('trip/:tripId/expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async createExpense(
    @Param('tripId') tripId: string,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    return await this.expenseService.createExpense(createExpenseDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async findAllExpenses(@Param('tripId') tripId: string) {
    return await this.expenseService.findAllExpenses(tripId);
  }

  @Get()
  async findAll() {
    return await this.expenseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.expenseService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return await this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.expenseService.remove(id);
  }
}
