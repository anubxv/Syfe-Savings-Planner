import { Goal, DashboardStats } from '@/types';

const STORAGE_KEYS = {
  GOALS: 'savings_planner_goals',
  CONTRIBUTIONS: 'savings_planner_contributions',
} as const;

export function saveGoals(goals: Goal[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  }
}

export function loadGoals(): Goal[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.GOALS);
    if (!stored) return [];
    
    const goals = JSON.parse(stored) as Goal[];
    return goals.map((goal) => ({
      ...goal,
      createdAt: new Date(goal.createdAt),
      contributions: goal.contributions.map((contrib) => ({
        ...contrib,
        date: new Date(contrib.date),
      })),
    }));
  } catch (error) {
    console.error('Error loading goals:', error);
    return [];
  }
}

export function calculateGoalProgress(goal: Goal): number {
  if (goal.targetAmount === 0) return 0;
  return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
}

export function calculateDashboardStats(goals: Goal[]): DashboardStats {
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  
  let overallProgress = 0;
  if (goals.length > 0) {
    const averageProgress = goals.reduce((sum, goal) => {
      return sum + calculateGoalProgress(goal);
    }, 0) / goals.length;
    overallProgress = averageProgress;
  }
  
  return {
    totalTarget,
    totalSaved,
    overallProgress,
    goalCount: goals.length,
  };
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function validateGoalForm(name: string, targetAmount: number): string[] {
  const errors: string[] = [];
  
  if (!name.trim()) {
    errors.push('Goal name is required');
  }
  
  if (targetAmount <= 0) {
    errors.push('Target amount must be greater than zero');
  }
  
  if (targetAmount > 10000000) {
    errors.push('Target amount is too large');
  }
  
  return errors;
}

export function validateContributionForm(amount: number): string[] {
  const errors: string[] = [];
  
  if (amount <= 0) {
    errors.push('Contribution amount must be greater than zero');
  }
  
  if (amount > 1000000) {
    errors.push('Contribution amount is too large');
  }
  
  return errors;
}
