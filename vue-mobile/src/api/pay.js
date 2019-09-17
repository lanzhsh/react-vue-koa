import { post } from '@/utils/request'

export function previewPrepay(data) {
  const url = '/jiajiao/order/h5/preview/prepay'
  return post(url, data)
}
