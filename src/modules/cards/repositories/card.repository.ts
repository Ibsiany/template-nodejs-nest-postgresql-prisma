import { prisma } from '../../../prisma.service';
import { CreateAndSaveCardDTO } from '../dtos/request/create-card-request.dto';
import { FindAllCardsDTO } from '../dtos/request/find-all-cards-request.dto';
import { CardEntityInterface } from '../interfaces/card-entity.interface';
import { CardRepositoryInterface } from './interfaces/card-repository.interface';

export class CardRepository implements CardRepositoryInterface {
  async createAndSave({
    description,
    status,
    title,
    user,
  }: CreateAndSaveCardDTO): Promise<CardEntityInterface> {
    return prisma.cards.create({
      data: {
        description,
        status,
        title,
        user_id: user.id,
      },
    });
  }

  async updateAndSave(card: CardEntityInterface): Promise<CardEntityInterface> {
    return prisma.cards.update({
      where: { id: card.id },
      data: card,
    });
  }

  async findById(id: string): Promise<CardEntityInterface | null> {
    return prisma.cards.findFirst({ where: { id } });
  }

  async findAll({
    id,
    description,
    status,
    title,
    user_id,
  }: FindAllCardsDTO): Promise<CardEntityInterface[]> {
    return prisma.cards.findMany({
      where: {
        user_id,
        id: id ? { equals: id } : undefined,
        description: description
          ? { contains: description.toLowerCase() }
          : undefined,
        status: status ? { equals: status } : undefined,
        title: title ? { contains: title.toLowerCase() } : undefined,
      },
    });
  }

  async deleteCard(card: CardEntityInterface): Promise<void> {
    await prisma.cards.delete({
      where: { id: card.id },
    });
  }
}
