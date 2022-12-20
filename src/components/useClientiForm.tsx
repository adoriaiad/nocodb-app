import React from 'react';
import Ajv from 'ajv';
import { IList } from '../models/clienti';

function useClientiForm() {
  const ajv = new Ajv({
    allErrors: true,
    useDefaults: true,
    keywords: ['uniforms'],
  });
  const schema = {
    title: 'Clienti',
    type: 'object',
    properties: {},
    required: [],
  };
  return <>useClientiForm</>;
}

export default useClientiForm;
