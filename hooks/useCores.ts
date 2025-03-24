import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/constant/QueryKeys';
import { Core, DayCores } from '@/storage/types';
import { format } from 'date-fns';
import { CoreStorage } from '@/storage/CoreStorage';

export function useCores(date: Date) {
  return useQuery({
    queryKey: QueryKeys.CORES(format(date, 'yyyy-MM-dd')),
    queryFn: async (): Promise<Core[]> => {
      return await CoreStorage.getCoresForDate(date);
    },
  });
}

export function useCore(date: Date, core: number) {
  return useQuery({
    queryKey: QueryKeys.CORE(format(date, 'yyyy-MM-dd'), core),
    queryFn: async (): Promise<Core> => {
      return await CoreStorage.getCoreForDate(date, core);
    },
  });
}

export function useSaveCore() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ date, habit }: { date: Date; habit: Core }): Promise<Date> => {
      const habits = await CoreStorage.getCoresForDate(date);
      const updatedHabits = habits.map((h) => (h.core === habit.core ? habit : h));
      const dayHabits: DayCores = {
        habits: updatedHabits,
        updatedAt: new Date(),
      };
      await CoreStorage.saveDayCores(date, dayHabits);
      return date;
    },
    onSuccess: async (date) => {
      await queryClient.invalidateQueries({ queryKey: QueryKeys.CORES(format(date, 'yyyy-MM-dd')) });
    },
  });
}
