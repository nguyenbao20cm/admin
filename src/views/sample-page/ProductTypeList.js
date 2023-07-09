import React from "react";
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import ProductType from "../Product/ProductType"
import { BackTop } from 'antd';

const ProductTypeList = () => {

  return (
    <>
      <PageContainer title="Sample Page" description="this is Sample page">
        <div hidden>
          {document.documentElement.scrollTop = 0}
        </div>
        <DashboardCard title="Danh sách loại sản phẩm ">
          <Typography paragraph>
            <ProductType />
          </Typography>
        </DashboardCard>  <BackTop />
        <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}>  </strong>
      </PageContainer>
    </>
  );
};
export default ProductTypeList;
