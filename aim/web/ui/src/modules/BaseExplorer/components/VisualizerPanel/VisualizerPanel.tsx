import * as React from 'react';

import { IVisualizerPanelProps } from '.';

import './VisualizerPanel.scss';

function VisualizerPanel(props: IVisualizerPanelProps) {
  const { grouping: Grouping, controls: Controls, engine } = props;
  return (
    <div className='VisualizerPanel'>
      {Grouping && <Grouping engine={engine} />}
      <Controls engine={engine} />
    </div>
  );
}

VisualizerPanel.displayName = 'VisualizerPanel';

export default React.memo(VisualizerPanel);
