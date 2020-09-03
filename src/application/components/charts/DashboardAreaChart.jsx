import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import '../styles/DashboardPage.scss'

const data = [
  {
    name: 'A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'G', uv: 3490, pv: 4300, amt: 2100,
  },
];

export default class DashboardAreaChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/Lrffmzfc/';

  render() {
    return (
      <div className="area-chart">
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ left: -25, top: 30, right: 5 }}>
            <XAxis dataKey="name" stroke="#848A9A" />
            <YAxis stroke="#848A9A" />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#7AAB5F" fill="#5E8346" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
