import * as React from 'react';

import { ITagInfo } from 'types/pages/tags/Tags';

export interface IAttachedTagsListProps {
  runHash: string;
  initialTags?: ITagInfo[];
  tags?: ITagInfo[];
  addTagButtonSize?: 'xSmall' | 'xxSmall';
  hasAttachedTagsPopup?: boolean;
  headerRenderer?: (tagsLength: number) => React.ReactNode;
  onTagsChange?: (tags: ITagInfo[]) => void;
  onRunsTagsChange?: (runHash: string, tags: ITagInfo[]) => void;
}
