import React from "react";
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

import InvoicePage from "../Invoice/Invoice"
import { Box } from '@mui/material';

const ProductTypeList = () => {

    return (
        <>
          
            <PageContainer title="Hóa đơn" description="this is Sample page">

                <DashboardCard title="Danh sách Hóa đơn">
                    <Typography paragraph>
                        <InvoicePage />
                    </Typography>
                </DashboardCard>
            </PageContainer>
        </>
    );
};
export default ProductTypeList;
