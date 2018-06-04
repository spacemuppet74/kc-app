import { sp } from '@pnp/sp'

export function getHubsSites() {
  return sp.web.lists.getByTitle('KC-Hub-Sites').items.get()
}