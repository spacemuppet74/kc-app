import { sp } from '@pnp/sp'

export function getGPSites() {
  return sp.web.lists.getByTitle("Kanban Cards Sites").items.getAll()
}