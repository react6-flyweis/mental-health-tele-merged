import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProviderAvailabilitySchedule } from "@/api/availability";

export function useUpdateAvailabilityScheduleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProviderAvailabilitySchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["availability"] });
    },
  });
}
