import React from 'react'
import { Pie } from '@ant-design/plots';
const GraficCircle = () => {

    const data = [
        {
          type: 'Samsung',
          value: 27,
        },
        {
          type: 'Huawei',
          value: 15,
        },
        {
          type: 'Phone',
          value: 28,
        }, 
        {
          type: 'LG',
          value: 15,
        },
        {
          type: 'ReDragon',
          value: 30,
        },
        {
          type: 'Logitech',
          value: 45,
        },
      ];
      const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.75,
        label: {
          type: 'spider',
          labelHeight: 28,
          content: '{name}\n{percentage}',
        },
        interactions: [
          {
            type: 'element-selected',
          },
          {
            type: 'element-active',
          },
        ],
      };
  return (
    <div className="mt-4 w-50 flex-grow-1">
    <h3 className="mb-4 ">Income Statics</h3>
    <br />
    <div>
    <Pie {...config} />
    </div>
  </div>
  )
}

export default GraficCircle