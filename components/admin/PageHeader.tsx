'use client';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  badge?: {
    count: number;
    label: string;
    variant?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  };
}

export default function PageHeader({ title, subtitle, actions, badge }: PageHeaderProps) {
  const getBadgeColor = (variant: string = 'blue') => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    };
    return colors[variant as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            {title}
          </h1>
          {badge && (
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${getBadgeColor(badge.variant)}`}>
              {badge.count} {badge.label}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {actions}
        </div>
      )}
    </div>
  );
}
