import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { CATEGORY_COLORS } from '../Dashboard/data';
import { formatINR, getLastNDaysDataGroupByCategory, isMobileDevice } from '../../utils';
import { useEffect, useState } from 'react';
import { USERID } from '../../constants';
import Card from '../Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { StoreActions, type InitialState } from '../../datatypes';

const CategorySpendPie = () => {
  const chartData = useSelector((state: InitialState) => state.pieChart);
  const transactions = useSelector((state: InitialState) => state.transactions);
  const [filter, setFilter] = useState<number>(7);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const userId = localStorage.getItem(USERID);
      if (userId) {
        const res = await getLastNDaysDataGroupByCategory(userId, filter);
        const data = Object.keys(res).map(key => ({
          category: key,
          value: res[key],
          name: `${key}: ${formatINR(res[key])}`
        }));
        dispatch({
          type: StoreActions.UPDATE_PIE_CHART,
          data
        })
      }
      setLoading(false);
    }

    fetchData();
  }, [transactions, filter]);

  const renderLabel = ({ percent }: { percent?: number }) =>
    `${((percent ?? 0) * 100).toFixed(0)}%`;

  return (
    <Card heading="Expense Breakdown" loading={loading} onFilterChange={(value) => setFilter(value)}>
      <div className='content-container'>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx={isMobileDevice() ? '20%' : '50%'}
                cy="50%"
                outerRadius={120}
                innerRadius={0}   // makes it donut
                paddingAngle={0}
                stroke="#111827"
                strokeWidth={.5}
                label={isMobileDevice() ? undefined : renderLabel}
                labelLine={false}
              >
                {chartData.map((d, index) => (
                  <Cell key={index} fill={CATEGORY_COLORS[d.category]} opacity={isMobileDevice() ? .2 : .8} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => formatINR(value as string)}
                contentStyle={{
                  background: "#7494daff",
                  border: "1px solid #374151",
                  color: "#fff"
                }}
              />

              <Legend
                layout='vertical'
                align='left'
                verticalAlign='middle'
                fontSize={.4}
                wrapperStyle={{ paddingLeft: '10px' }}
                itemSorter={(item) =>
                  -((item?.payload as any)?.value ?? 0)
                } />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}

export default CategorySpendPie;