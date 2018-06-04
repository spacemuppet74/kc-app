import { sp } from '@pnp/sp'

export function getGPItems() {
  return sp.web.lists.getByTitle('Kanban Cards GP Items').items.getAll()
}