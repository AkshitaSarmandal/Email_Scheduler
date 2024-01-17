const hours = Array.from({ length: 12 }, (_, i) => i + 1);

export const timeOptions = hours.flatMap((hour) => [
  { value: `${hour}:00`, label: `${hour}:00 AM` },
  { value: `${hour}:30`, label: `${hour}:30 AM` },
]);
