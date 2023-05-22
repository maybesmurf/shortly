import React from 'react';

type UserLinkDetailsStatsEntryProps = {
  label: string;
  count: number;
  renderIcon: () => JSX.Element;
};

const UserLinkDetailsStatsEntry: React.FC<UserLinkDetailsStatsEntryProps> = (props) => {
  const { label, count, renderIcon } = props;

  return (
    <div className="bg-primary-300/50 dark:bg-primary-500/50 flex items-center justify-between rounded-lg px-4 py-2 shadow-lg transition-transform hover:scale-105">
      <div className="relative z-10 flex w-full max-w-[calc(100%-3rem)] items-center">
        {renderIcon()}
        <p className="ml-2 text-sm font-bold text-neutral-900 dark:text-neutral-50">{label}</p>
      </div>
      <span className="text-sm font-bold text-neutral-900 dark:text-neutral-50">{count}</span>
    </div>
  );
};

export default UserLinkDetailsStatsEntry;
