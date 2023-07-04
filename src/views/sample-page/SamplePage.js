import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import queryString from 'query-string';
import ProductList from "../Product/Product"
import { useLocation } from 'react-router';
const SamplePage = () => {
  const location = useLocation()
  var [ImportPrice, setImportPrice] = React.useState(() => {
    const a = queryString.parse(location.search)
    console.log(a)
  }
  );
  const a = queryString.parse(location.search)

  return (
    <PageContainer title="Sample Page" description="this is Sample page">
    
      <DashboardCard title="Danh sách sản phẩm ">
        <Typography paragraph>
          <ProductList />
        </Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
