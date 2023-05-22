'use client';
import { AnalyticsDataType, LinkStatsResponse } from '@modules/analytics/types/analytics.types';
import { useUserDashboardLinkContext } from '@modules/dashboard/hooks/use-user-dashboard-link-context';
import { Skeleton } from '@modules/ui/components/skeleton/skeleton';
import React from 'react';

import { useQuery } from 'react-query';

type UserLinkStatsCategoryProps = {
  category: string;
  dataType: AnalyticsDataType;
  renderContent: (data: LinkStatsResponse<unknown>) => React.ReactElement;
};

const UserLinkStatsCategory = (props: UserLinkStatsCategoryProps) => {
  const { category, dataType, renderContent } = props;

  const { link } = useUserDashboardLinkContext();

  const { data, isLoading } = useQuery<LinkStatsResponse<unknown>>([category], {
    enabled: !!link,
    queryFn: async () => {
      const url = new URL(`/api/links/${encodeURIComponent(link?.alias!)}/stats`, process.env.NEXT_PUBLIC_URL);
      url.searchParams.append('stat', dataType);
      const response = await fetch(url, {
        method: 'GET',
      });
      const { data }: { data: LinkStatsResponse<unknown> } = await response.json();
      let statsData = data ?? [];
      statsData.sort((a, b) => b.count - a.count);
      return statsData;
    },
  });

  return (
    <div className="bg-background-100 dark:bg-background-800 flex flex-col gap-4 rounded-lg p-4 shadow-lg md:p-6">
      <Skeleton loading={isLoading || !link}>
        <h2 className="text-xl font-semibold">{category}</h2>
      </Skeleton>
      <Skeleton className="w-full" loading={isLoading || !link}>
        <div className="grid gap-4">
          {data && data.length > 0 ? (
            renderContent(data)
          ) : (
            <span className="text-center text-sm">Not enough data!</span>
          )}
        </div>
      </Skeleton>
    </div>
  );
};

export default UserLinkStatsCategory;
