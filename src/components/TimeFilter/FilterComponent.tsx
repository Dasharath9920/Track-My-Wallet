import { useState } from 'react'
import { TIME_PERIODS } from '../Dashboard/data';
import './FilterComponent.css';

const FilterComponent = (props: FilterComponentProps) => {
  const { onChange } = props;
  const [filter, setFilter] = useState<number>(TIME_PERIODS[0].value);

  const handleFilterChange = (value: string) => {
    let filter = Number(value);
    setFilter(filter);
    onChange(filter);
  }

  return (
    <select
      id='filter'
      name='filter'
      value={filter}
      onChange={e => handleFilterChange(e.target.value)}
      className='filter-select'
      required
    >
      {
        TIME_PERIODS.map(timePeriod =>
          <option key={timePeriod.id} value={timePeriod.value}>{timePeriod.label}</option>
        )
      }
    </select>
  )
}

type FilterComponentProps = {
  onChange: (value: number) => void
}

export default FilterComponent;