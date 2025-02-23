import PageTitle from '@/components/pageTitle';
import StockTable from '@/components/StockTable/index ';

import React from 'react';

const TradeTipsStockTable = () => {
  return (
    <div>
      <PageTitle title="Stocks Table" />
      <StockTable />
    </div>
  );
};

export default TradeTipsStockTable;
