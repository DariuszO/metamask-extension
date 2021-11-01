import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { I18nContext } from '../../../contexts/i18n';
import { useGasFeeContext } from '../../../contexts/gasFee';

import TransactionDetailItem from '../transaction-detail-item/transaction-detail-item.component';

// eslint-disable-next-line prefer-destructuring
const EIP_1559_V2 = process.env.EIP_1559_V2;

// areDappSuggestedAndTxParamGasFeesTheSame

const GasLevelIconMap = {
  low: '🐢',
  medium: '🦊',
  high: '🦍',
  dappSuggested: '🌐',
  custom: '⚙',
};

export default function TransactionDetail({ rows = [], onEdit }) {
  const t = useContext(I18nContext);
  const { estimateToUse } = useGasFeeContext();

  if (EIP_1559_V2) {
    console.log('estimateToUse = ', estimateToUse);
    return (
      <div className="transaction-detail">
        {onEdit && (
          <div className="transaction-detail-edit-V2">
            <button onClick={onEdit}>
              <span className="transaction-detail-edit-V2-icon">
                {`${GasLevelIconMap[estimateToUse]} `}
              </span>
              <span className="transaction-detail-edit-V2-label">
                {t(estimateToUse)}
              </span>
              <i className="fas fa-chevron-right asset-list-item__chevron-right" />
            </button>
          </div>
        )}
        <div className="transaction-detail-rows">{rows}</div>
      </div>
    );
  }

  return (
    <div className="transaction-detail">
      {onEdit && (
        <div className="transaction-detail-edit">
          <button onClick={onEdit}>{t('edit')}</button>
        </div>
      )}
      <div className="transaction-detail-rows">{rows}</div>
    </div>
  );
}

TransactionDetail.propTypes = {
  rows: PropTypes.arrayOf(TransactionDetailItem).isRequired,
  onEdit: PropTypes.func,
};
