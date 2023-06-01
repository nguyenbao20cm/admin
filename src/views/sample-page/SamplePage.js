import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

import ProductList from "../Product/Product"
const SamplePage = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">

      <DashboardCard title="Products List">
        <Typography paragraph>
          <ProductList />
        </Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
