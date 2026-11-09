import { DoctorsService } from './doctors.service';

describe('DoctorsService', () => {
  it('applies specialty and city filters', async () => {
    const findMany = jest.fn().mockResolvedValue([]);
    const service = new DoctorsService({ doctorProfile: { findMany } } as never);

    await service.findAll('Cardio', 'Dhaka');

    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          specialty: { contains: 'Cardio', mode: 'insensitive' },
          user: { city: { equals: 'Dhaka', mode: 'insensitive' } },
        }),
      }),
    );
  });
});
