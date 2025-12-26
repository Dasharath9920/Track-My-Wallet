import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { CATEGORY_COLORS } from '../Dashboard/data';
import { getLastNDaysDataGroupByCategory } from '../../utils';
import { useEffect, useState } from 'react';
import { USERID } from '../../constants';
import Card from '../Card/Card';

const CategorySpendPie = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const userId = localStorage.getItem(USERID);
      if (userId) {
        const res = await getLastNDaysDataGroupByCategory(userId, 30);
        const data = Object.keys(res).map(key => ({
          category: key,
          value: res[key],
          name: `${key}: ₹${res[key]}`
        }));
        setChartData(data);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  const renderLabel = ({ percent }: { percent?: number }) =>
    `${((percent ?? 0) * 100).toFixed(0)}%`;

  return (
    <Card heading="Expense Breakdown" loading={loading}>
      <div className='content-container'>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={0}   // makes it donut
                paddingAngle={0}
                stroke="#111827"
                strokeWidth={.5}
                label={renderLabel}
                labelLine={false}
              >
                {chartData.map((d, index) => (
                  <Cell key={index} fill={CATEGORY_COLORS[d.category]} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => `₹${value}`}
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