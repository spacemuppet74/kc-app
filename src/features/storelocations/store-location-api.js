import { sp } from '@pnp/sp'

export function getStoreLocations() {
  return sp.web.lists.getByTitle("kc-store-locations").items.get()
}