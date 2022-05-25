<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <hy-card title="分类商品数量(饼图)">
          <pie-chart :pieData="pieData"></pie-chart>
        </hy-card>
      </el-col>
      <el-col :span="10">
        <hy-card title="不同城市商品销量"> </hy-card>
      </el-col>
      <el-col :span="7">
        <hy-card title="分类商品数量(玫瑰图)">
          <rose-chart :pieData="pieData"></rose-chart>
        </hy-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <hy-card title="分类商品的销量">
          <line-chart :title="'销量'" v-bind="categoryGoodsSale"></line-chart
        ></hy-card>
      </el-col>
      <el-col :span="12">
        <hy-card title="分类商品的收藏">
          <bar-chart v-bind="categoryGoodsFavor"></bar-chart
        ></hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import HyCard from '@/base-ui/card';
import { PieChart, RoseChart, LineChart, BarChart } from '@/components/echarts';
import { useStore } from '@/store';
const store = useStore();
store.dispatch('dashboardModule/getDashboardDataAction');
const pieData = computed(() => {
  return store.state.dashboardModule?.categoryGoodsSale.map((item) => {
    return { name: item.name, value: item.goodsCount };
  });
});
const categoryGoodsSale = computed(() => {
  const categoryGoodsSale = store.state.dashboardModule?.categoryGoodsSale;
  const XLabel: string[] = [];
  const value: any[] = [];
  for (const item of categoryGoodsSale) {
    XLabel.push(item.name);
    value.push(item.goodsCount);
  }

  return { XLabel, value };
});
const categoryGoodsFavor = computed(() => {
  const XLabel: string[] = [];
  const value: any[] = [];
  const categoryGoodsFavorData =
    store.state.dashboardModule?.categoryGoodsFavor;
  for (const item of categoryGoodsFavorData) {
    XLabel.push(item.name);
    value.push(item.goodsFavor);
  }

  return { XLabel, value };
});
</script>

<style scoped></style>
