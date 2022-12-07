import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_SERVER_URL,
  timeout: 1000,
  headers: {
    'accept-encoding': '*',
    authority: process.env.REACT_SERVER_URL || 'https://nocodb.iad2.cloud',
    scheme: 'https',
    'xc-auth':
      process.env.REACT_XCAUTH ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2VsaXRhLmRvcmlhQGlhZDIuaXQiLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJpZCI6InVzXzNzZTlyNmNhazI1eG16Iiwicm9sZXMiOiJvcmctbGV2ZWwtdmlld2VyIiwidG9rZW5fdmVyc2lvbiI6ImZkMGIwOWFkZTg0Y2E5ZjczODc3OTM5NmVmZWM3MmNjYzcxYzUwNzc1ZTY3MjYwZDFmOTQxMWFiMDMzMjk1N2FkZmNjMTRmZjM2OGMwZjQ5IiwiaWF0IjoxNjcwNDEzMzk4LCJleHAiOjE2NzA0NDkzOTh9.OeZL1VHwNRUJwDHO1oi9oG9amYtpluHoo0DLSwOCj2U',
  },
});
