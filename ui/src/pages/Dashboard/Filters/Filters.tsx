import React from 'react';
import { Switch, Select } from 'antd';
import type { SelectProps } from 'antd';
import customTheme from '../../../theme';

type FiltersProps = {
  showUnavailable: boolean;
  onShowUnavailable: (checked: boolean) => void;
  citySelectOptions: SelectProps['options'];
  onCitySelectChange: SelectProps['onChange'];
  isCititesLoading: boolean;
  selectedCities: string[];
}

const Filters: React.FC<FiltersProps> = ({
  showUnavailable,
  onShowUnavailable,
  isCititesLoading,
  citySelectOptions,
  selectedCities,
  onCitySelectChange,
}) => (
  <div style={{ display: 'flex', justifyContent: 'space-between'}}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Switch checked={showUnavailable} onChange={onShowUnavailable} />
      <span style={{ color: customTheme.token.colorTextBase, marginLeft: '0.5rem' }}>
        Show meetings with no seats available
      </span>
    </div>
    <div style={{ minWidth: '30%' }}>
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select a city"
        options={citySelectOptions}
        loading={isCititesLoading}
        value={selectedCities}
        onChange={onCitySelectChange}
      />
    </div>

  </div>
  
);

export default Filters;