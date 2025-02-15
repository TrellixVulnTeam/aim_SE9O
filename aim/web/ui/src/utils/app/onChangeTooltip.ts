import { ANALYTICS_EVENT_KEYS } from 'config/analytics/analyticsKeysMap';
import { GroupNameEnum } from 'config/grouping/GroupingPopovers';

import * as analytics from 'services/analytics';

import {
  IMetricsCollection,
  ITooltip,
} from 'types/services/models/metrics/metricsAppModel';
import { IModel, State } from 'types/services/models/model';

import getTooltipContent from 'utils/getTooltipContent';

import updateURL from './updateURL';

export default function onChangeTooltip<M extends State>({
  tooltip,
  groupingItems,
  model,
  appName,
}: {
  tooltip: Partial<ITooltip>;
  groupingItems: GroupNameEnum[];
  model: IModel<M>;
  appName: string;
}): void {
  let {
    config: configData,
    data,
    groupingSelectOptions = [],
  } = model.getState();

  if (configData?.chart) {
    // TODO remove this later
    // remove unnecessary content prop from tooltip config
    if (configData.chart.tooltip?.hasOwnProperty('content')) {
      delete configData.chart.tooltip.content;
    }

    configData = {
      ...configData,
      chart: {
        ...configData.chart,
        tooltip: {
          ...configData.chart.tooltip,
          ...tooltip,
        },
      },
    };

    const tooltipData = {
      ...configData?.chart?.tooltip,
      content: getTooltipContent({
        groupingItems,
        groupingSelectOptions,
        data: data as IMetricsCollection<any>[],
        configData,
        activePointKey: configData.chart?.focusedState?.key,
        selectedFields: configData.chart?.tooltip?.selectedFields,
      }),
    };
    model.setState({ config: configData, tooltip: tooltipData });
    updateURL({ configData, appName });
  }
  analytics.trackEvent(
    // @ts-ignore
    ANALYTICS_EVENT_KEYS[appName].chart.controls.tooltip.changeTooltipContent,
  );
}
