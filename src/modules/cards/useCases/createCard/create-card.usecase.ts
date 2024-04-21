import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from '../../../categories/repositories/category.repository';
import { UserRepository } from '../../../users/repositories/user.repository';
import { CardEntityInterface } from '../../interfaces/card-entity.interface';
import { CardRepository } from '../../repositories/card.repository';
import { CreateCardDTO } from './dtos/request/create-card-request.dto';

@Injectable()
export class CreateCardUseCase {
  constructor(
    private readonly cardRepository: CardRepository,

    private readonly userRepository: UserRepository,

    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async execute({
    user_id,
    description,
    title,
    status,
    category_ids,
  }: CreateCardDTO): Promise<CardEntityInterface> {
    if (!user_id || !description || !title || !status) {
      throw new BadRequestException('Error in the creation of the card!');
    }

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new NotFoundException('User does not exists!');
    }

    const categories = [];
    if (category_ids && category_ids?.length > 0) {
      for (const category_id of category_ids) {
        const category = await this.categoryRepository.findById(category_id);

        if (category) categories.push(category);
      }
    }

    const card = await this.cardRepository.createAndSave({
      status,
      title,
      description,
      user,
      categories,
    });

    return card;
  }
}
