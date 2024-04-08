import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './expense.schema';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name)
    private expenseModel: Model<Expense>,
  ) {}

  async createExpense(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const createdExpense = new this.expenseModel(createExpenseDto);
    return await createdExpense.save();
  }

  async findAllExpenses(tripId: string): Promise<Expense[]> {
    return await this.expenseModel.find({ trip: tripId }).exec();
  }

  async findAll(): Promise<Expense[]> {
    return await this.expenseModel.find().exec();
  }

  async findOne(id: string): Promise<Expense> {
    return await this.expenseModel.findById(id).exec();
  }

  async update(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    return await this.expenseModel
      .findByIdAndUpdate(id, updateExpenseDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Expense> {
    return await this.expenseModel.findByIdAndDelete(id).exec();
  }
}
