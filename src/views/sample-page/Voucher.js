import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

import Voucher from "../Voucher/VoucherCRUD"
const SamplePage = () => {
    return (
        <PageContainer title="Voucher" description="this is Sample page">

            <DashboardCard title="Quản lý Voucher">
                <Typography paragraph>
                    <Voucher />
                </Typography>
            </DashboardCard>
        </PageContainer>
    );
};

export default SamplePage;
