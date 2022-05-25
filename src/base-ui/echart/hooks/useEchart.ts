import * as charts from 'echarts';
import { EChartsOption } from 'echarts';
export default function (el: HTMLElement) {
  const chartInit = charts.init(el);
  const setOption = (options: EChartsOption) => {
    chartInit.setOption(options);
  };
  const updateSize = () => {
    chartInit.resize();
  };
  window.addEventListener('resize', () => {
    chartInit.resize();
  });
  return {
    chartInit,
    setOption,
    updateSize,
  };
}
