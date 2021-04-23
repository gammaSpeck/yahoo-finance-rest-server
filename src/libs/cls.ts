import configs from '@configs'
import { createNamespace } from 'continuation-local-storage'

export const CLS_NS = createNamespace(configs.cls.namespace)
