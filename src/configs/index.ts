export const configs = () => ({
  host: process.env.HOST || '0.0.0.0',
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  rapidAPIKey: process.env.RAPID_API_KEY || 'DO_NOT_COMMIT_YOUR_API_KEY',
  cls: {
    namespace: process.env.CLS_REQ_NAMESPACE || 'req_session',
    correlationIdField: process.env.CORR_ID || 'x-correlation-id'
  }
})

export default configs()
