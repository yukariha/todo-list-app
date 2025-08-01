export class Todo {
  public id: string;

  constructor(
    public title: string,
    public description: string,
    public dueDate: Date,
    public priority: Priority,
    public status: Status,
  ) {
    this.id = crypto.randomUUID();
  }
}

export enum Priority {
  High,
  Medium,
  Low,
}

export function StringToPriority(str: string): Priority {
  switch (str.toLowerCase()) {
    case "high":
      return Priority.High;
    case "medium":
      return Priority.Medium;
    case "low":
      return Priority.Low;
    default:
      throw new Error("Invalid variant found");
  }
}

export function PriorityToString(variant: Priority): string {
  switch (variant) {
    case Priority.High:
      return "High";
    case Priority.Medium:
      return "Medium";
    case Priority.Low:
      return "Low";
    default:
      throw new Error("Invalid Priority variant");
  }
}

export enum Status {
  Completed,
  InProgress,
  Pending,
}

export function StringToStatus(str: string): Status {
  switch (str.toLowerCase()) {
    case "completed":
      return Status.Completed;
    case "in-progress":
    case "inprogress":
      return Status.InProgress;
    case "pending":
      return Status.Pending;
    default:
      throw new Error("Invalid Status variant");
  }
}

export function StatusToString(variant: Status): string {
  switch (variant) {
    case Status.Completed:
      return "Completed";
    case Status.InProgress:
      return "In Progress";
    case Status.Pending:
      return "Pending";
    default:
      throw new Error("Invalid Status variant");
  }
}
