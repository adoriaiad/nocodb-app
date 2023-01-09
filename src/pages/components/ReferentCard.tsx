import React from 'react';
import { IReferenteCliente, IReferenteInterno } from '../../models/clienti';

type ReferentCardProps = {
  data: IReferenteCliente | IReferenteInterno;
};
function ReferentCard(props: ReferentCardProps) {
  const { data } = props;

  return <div>ReferentCard</div>;
}

export default ReferentCard;
