import React from "react";
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

import InvoicePage from "../Invoice/Invoice"
import { Box } from '@mui/material';

const ProductTypeList = () => {

    return (
        <>
          
            <PageContainer title="Sample Page" description="this is Sample page">

                <DashboardCard title="Invoices List">
                    <Typography paragraph>
                        <InvoicePage />
                    </Typography>
                </DashboardCard>
            </PageContainer>
        </>
    );
};
export default ProductTypeList;
