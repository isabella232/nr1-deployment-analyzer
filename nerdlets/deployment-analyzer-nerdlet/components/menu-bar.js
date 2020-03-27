import React from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';
import { Statistic } from 'semantic-ui-react';

const initialState = { isLoading: false, results: [], value: '', type: '' };

export default class MenuBar extends React.PureComponent {
  static propTypes = {
    sortByOptions: PropTypes.object,
    groupBy: PropTypes.object,
    setParentState: PropTypes.func,
    metrics: PropTypes.object,
    updateFilter: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  state = initialState;

  render() {
    const { sortByOptions, groupBy, setParentState, metrics } = this.props;
    if (!sortByOptions) {
      return null;
    }

    const quickFilterOptions = [
      { key: 1, label: 'Error Rate > 0', value: 'Error Rate > 0' },
      { key: 2, label: 'Apdex Score < 1', value: 'Apdex Score < 1' },
      { key: 3, label: 'Alerting', value: 'Alerting' }, // !"NOT_CONFIGURED" //!"NOT_ALERTING"
    ];
    const groupByOptions = Object.keys(sortByOptions).map((option, i) => {
      return {
        key: i,
        label: option,
        value: option,
        type: sortByOptions[option],
      };
    });

    return (
      <div>
        <div className="utility-bar">
          <div className="react-select-input-group">
            <label>Group By</label>
            <Select
              options={groupByOptions}
              onChange={(groupBy) => {
                setParentState({ groupBy }, 'groupDeployments');
              }}
              value={groupBy}
              classNamePrefix="react-select"
            />
          </div>
          <div className="react-select-input-group">
            <label>Quick Filters</label>
            <Select
              options={quickFilterOptions}
              onChange={this.props.updateFilter}
              value={null}
              classNamePrefix="react-select"
            />
          </div>

          <div className="flex-push" />

          <div>
            <Statistic.Group size="mini" style={{ paddingRight: '30px' }}>
              {/* <Statistic>
                                <Statistic.Value>{metrics.appsWithApdexBelow1.length}</Statistic.Value>
                                <Statistic.Label>{"Apps w/Apdex < 1"}</Statistic.Label>
                            </Statistic> */}
              <Statistic
                style={{ cursor: 'pointer' }}
                onClick={() => this.props.updateFilter(quickFilterOptions[0])}
              >
                <Statistic.Value>
                  {metrics.appsWithErrors.length}
                </Statistic.Value>
                <Statistic.Label>Apps w/Errors</Statistic.Label>
              </Statistic>
              <Statistic
                style={{ cursor: 'pointer' }}
                onClick={() => this.props.updateFilter(quickFilterOptions[2])}
              >
                <Statistic.Value>{metrics.appsAlerting.length}</Statistic.Value>
                <Statistic.Label>Apps Alerting</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{metrics.deploysToday}</Statistic.Value>
                <Statistic.Label>Deploys Today</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{metrics.total}</Statistic.Value>
                <Statistic.Label>Total Deployments</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </div>
        </div>
      </div>
    );
  }
}
