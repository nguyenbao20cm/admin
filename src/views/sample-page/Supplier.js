import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

import Supplier from "../Supplier/SupplierCRUD"
const SamplePage = () => {
    return (
        <PageContainer title="Nhà cung cấp" description="this is Sample page">

            <DashboardCard title="Quản lý Nhà cung cấp">
                <Typography paragraph>
                    <Supplier />
                </Typography>
            </DashboardCard>
        </PageContainer>
    );
};

export default SamplePage;
