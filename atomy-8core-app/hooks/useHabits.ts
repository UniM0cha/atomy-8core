import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/constant/QueryKeys';
import { DayHabits, Habit } from '@/storage/types';
import { format } from 'date-fns';
import { HabitStorage } from '@/storage/HabitStorage';

export function useHabits(date: Date) {
  return useQuery({
    queryKey: QueryKeys.HABITS(format(date, 'yyyy-MM-dd')),
    queryFn: async (): Promise<Habit[]> => {
      return await HabitStorage.getHabitsForDate(date);
    },
  });
}

export function useSaveHabit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ date, habit }: { date: Date; habit: Habit }): Promise<Date> => {
      const habits = await HabitStorage.getHabitsForDate(date);

      const updatedHabits = habits.map((h) => (h.core === habit.core ? habit : h));

      const dayHabits: DayHabits = {
        habits: updatedHabits,
        updatedAt: new Date(),
      };

      await HabitStorage.saveHabit(date, dayHabits);

      return date;
    },
    onSuccess: async (date) => {
      await queryClient.invalidateQueries({ queryKey: QueryKeys.HABITS(format(date, 'yyyy-MM-dd')) });
    },
  });
}
