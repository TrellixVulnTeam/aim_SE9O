import React, { useEffect } from 'react';

import { Text } from 'components/kit';

import createEngine from '../BaseExplorerCore/core-store';
import { IEngineConfigFinal } from '../BaseExplorerCore/types';

import { IExplorerConfig, IBaseExplorerProps } from './types';
import ExplorerBar from './components/ExplorerBar';

function BaseExplorer(props: IBaseExplorerProps) {
  const {
    ui: { components },
    engineInstance,
  } = props;
  const { initialized } = engineInstance.useStore(
    engineInstance.engineStatusSelector,
  );

  useEffect(() => {
    engineInstance.initialize();
  }, [engineInstance]);

  const visualizations = React.useMemo(() => {
    const p = {
      engine: engineInstance,
      box: components.box,
      controlComponent: components.controls,
    };
    const Visualizations: React.ReactNode[] = components.visualizations.map(
      (Viz) => <Viz key={Viz.displayName} {...p} />,
    );

    return Visualizations;
  }, [engineInstance, components.box, components.visualizations]);

  return initialized ? (
    <div style={{ width: '100%', height: '100vh' }}>
      <ExplorerBar
        engine={props.engineInstance}
        explorerName={props.explorerName}
      />
      <div
        className='flex fjb fac'
        style={{
          height: '92px',
          borderBottom: '1px solid #e8f1fc',
        }}
      >
        <components.queryForm engine={props.engineInstance} />
        <components.grouping engine={props.engineInstance} />
      </div>
      <div className='AimVisualizer'>{visualizations}</div>
    </div>
  ) : (
    <>
      <div>Initializing</div>
    </>
  );
}

function createExplorer(config: IExplorerConfig): () => React.ReactElement {
  const { ui, engine: EC } = config;

  const engineConfig: IEngineConfigFinal = {
    defaultBoxConfig: ui.defaultBoxConfig,
    sequenceName: EC.sequenceName,
    useCache: EC.useCache,
    adapter: {
      objectDepth: EC.adapter.objectDepth,
    },
    states: config.states,
    grouping: EC.grouping,
    controls: EC.controls,
  };

  const engine = createEngine(engineConfig);

  return (): JSX.Element => (
    <BaseExplorer {...config} engineInstance={engine} />
  );
}

export default createExplorer;
