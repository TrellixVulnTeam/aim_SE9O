import {
  IAlignmentConfig,
  IFocusedState,
  IGroupingSelectOption,
  ITooltipContent,
} from 'types/services/models/metrics/metricsAppModel';

import { ChartTypeEnum } from 'utils/d3';

export interface IPopoverContentProps {
  tooltipContent: ITooltipContent;
  focusedState: IFocusedState;
  chartType: ChartTypeEnum;
  alignmentConfig?: IAlignmentConfig;
  selectOptions: IGroupingSelectOption[];
  onRunsTagsChange: (runHash: string, tags: ITagInfo[]) => void;
}
