import { Urgency } from '@prisma/client';

export default function getUrgencyInt(urgency: Urgency) {
  switch (urgency) {
    case Urgency.LOW:
      return 1;
    case Urgency.MEDIUM:
      return 2;
    case Urgency.HIGH:
      return 3;
    default:
      return 0;
  }
}
