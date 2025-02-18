import PageTitle from '@/components/pageTitle';
import StockTable from '@/components/StockTable/index ';

import React from 'react';

const CreateTradeTip = () => {
  return (
    <div>
      <PageTitle title="Stocks Table" />

      <StockTable />
    </div>
  );
};

export default CreateTradeTip;
